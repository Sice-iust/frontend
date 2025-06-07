import axios from "axios";

const handlePayment = async (orderDetails: {
    location_id: number;
    deliver_time: number;
    discription: string;
    total_price: number;
    profit: number;
    total_payment: number;
    discount_text: string;
    payment_status: string;
    reciver: string;
    reciver_phone: string;
}): Promise<void> => {
    console.log("Payment button clicked", orderDetails);
    try {
        const response = await axios.post(
            "https://nanziback.liara.run/user/order/submit/",
            orderDetails,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Payment data:", response.data);
        const redirectUrl = response.data.payment_url;

        if (redirectUrl) {
            window.open(redirectUrl, "_blank", "width=600,height=600");
        } else {
            alert("Payment processed, but no redirect URL was provided.");
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        alert("Payment failed. Please try again.");
    }
};

export default handlePayment;