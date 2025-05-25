import axios from "axios";

const handlePayment = async (): Promise<void> => {
    console.log("Payment button clicked");
    try {
        const response = await axios.post('https://nanziback.liara.run/user/order/submit/', {
            location_id: 1,
            deliver_time: 10,
            discription: "test",
            total_price: 65465,
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
            const paymentWindow = window.open(redirectUrl, '_blank', 'width=600,height=600');
            
            // Check for payment completion periodically
            
        } else {
            alert("Payment processed, but no redirect URL was provided.");
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        alert("Payment failed. Please try again.");
    }
};


export default handlePayment;