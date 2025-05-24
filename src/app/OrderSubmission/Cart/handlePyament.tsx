import axios from "axios";

const handlePayment = async (): Promise<void> => {
    console.log("Payment button clicked");
    try {
        const response = await axios.post('https://nanziback.liara.run/user/order/submit/', {
            location_id: 1,
            deliver_time: 10,
            discription: "test",
            total_price: 1011100,
            profit: 507,
            total_payment: 67,
            discount_text: "string",
            payment_status: "unpaid",
        }, {
            headers: {  
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Payment data:", response.data);
        const redirectUrl = response.data.payment_url;

        if (redirectUrl) {
            // Open payment gateway in a new window
            const paymentWindow = window.open(redirectUrl, '_blank', 'width=600,height=600');
            
            // Check for payment completion periodically
            const checkPayment = setInterval(async () => {
                if (paymentWindow?.closed) {
                    clearInterval(checkPayment);
                    await verifyPaymentStatus();
                }
            }, 1000);
        } else {
            alert("Payment processed, but no redirect URL was provided.");
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        alert("Payment failed. Please try again.");
    }
};

const verifyPaymentStatus = async () => {
    try {
        // Get the current URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const authority = urlParams.get('Authority');
        const status = urlParams.get('Status');
        
        if (!authority || !status) {
            throw new Error("Missing payment verification parameters");
        }

        // Extract order_id from the URL path if needed
        const pathParts = window.location.pathname.split('/');
        const orderId = pathParts[pathParts.indexOf('verify') + 1];

        const response = await axios.get(
            `https://nanziback.liara.run/user/order/verify/${orderId}/`, 
            {
                params: {
                    Authority: authority,
                    State: status
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
        
        if (response.data.status === 'OK') {
            alert("Payment was successful!");
            // Optionally redirect to a success page
            window.location.href = "/payment-success";
        } else {
            alert("Payment failed. Please try again.");
            window.location.href = "/payment-failed";
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        alert("Error verifying payment status.");
        window.location.href = "/payment-failed";
    }
};

// Call verifyPaymentStatus when the page loads if we're on the callback URL
if (window.location.pathname.includes('/order/verify/')) {
    verifyPaymentStatus();
}
export default handlePayment;