import axios from "axios";

const handlePayment = async (): Promise<void> => {
    console.log("Payment button clicked");
    try {
        const response = await axios.post('https://nanziback.liara.run/user/order/submit/', {
            location_id: 1,
            deliver_time: 10,
            discription: "test",
            total_price: 1000,
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
            const checkPayment = setInterval(() => {
                if (paymentWindow?.closed) {
                    clearInterval(checkPayment);
                    verifyPaymentStatus();
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
        const response = await axios.get('https://nanziback.liara.run/user/order/verify/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        
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
    }
};