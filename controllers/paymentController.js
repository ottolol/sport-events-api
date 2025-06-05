const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Создание платежного намерения
exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe работает с минимальными единицами (копейки)
      currency: "rub",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Ошибка создания платежа:", err);
    res.status(500).json({ error: "Не удалось создать платежное намерение" });
  }
};