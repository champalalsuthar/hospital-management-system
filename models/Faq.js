const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    qus_name: {
        type: String,
        required: true,
    },
    ans: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const Faq = mongoose.models.Faq || mongoose.model('Faq', faqSchema);

module.exports = Faq;