require('dotenv').config()

const constants = {
    BASE_URL: process.env.BASE_URL || 'https://erp.psit.ac.in',
    PORT: process.env.PORT || 3000,
}

module.exports = constants