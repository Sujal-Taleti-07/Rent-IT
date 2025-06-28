import axios from "axios";
import toast from "react-hot-toast";

const handlePayment = async (amount, bookingData, onSuccess) => {
  try {
    if (!amount || !bookingData) {
      toast.error("Invalid payment details!");
      return;
    }

    // 🔹 Create an order
    const { data } = await axios.post("http://localhost:4001/payment/create-order", {
      amount,
    });

    console.log("Order Created:", data);

    // 🔹 Configure Razorpay Payment Window
    const options = {
      key: process.env.RazorKey, // Replace with your Razorpay test key
      amount: data.amount,
      currency: "INR",
      name: "Rent IT",
      description: "Booking Payment",
      order_id: data.id, // Use order ID from backend
      handler: async function (response) {
        console.log("Payment Success:", response);

        // 🔹 Verify Payment with Backend
        const verifyRes = await axios.post("http://localhost:4001/payment/verify-payment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          amount: data.amount,
          
        });

        if (verifyRes.data.success) {
          toast.success("Payment Successful!");

          // 🔹 Proceed with Booking After Successful Payment
          onSuccess();
        } else {
          toast.error("Payment verification failed!");
        }
      },
      prefill: {
        name: bookingData.userName || "Guest",
        email: bookingData.userEmail || "guest@example.com",
        contact: bookingData.userPhone || "0000000000",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Payment Failed!");
  }
};

export default handlePayment;
