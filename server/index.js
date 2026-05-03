import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*'
app.use(cors({ origin: FRONTEND_ORIGIN }))

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'noreply@stemhub.ug'
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'info@stemhub.ug'

function escapeHtml(s = '') {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

app.post('/contact', async (req, res) => {
    if (!RESEND_API_KEY) return res.status(500).json({ error: 'Missing RESEND_API_KEY in environment' })

    const { name, email, organisation, subject, message } = req.body || {}
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' })

    const subjectLine = `Contact form — ${subject || 'general'} — ${name}`

    const html = `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Organisation:</strong> ${escapeHtml(organisation || '')}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || '')}</p>
        <hr />
        <div>${escapeHtml(message).replace(/\n/g, '<br/>')}</div>
    `

    try {
        const resp = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: CONTACT_FROM_EMAIL,
                to: [CONTACT_TO_EMAIL],
                subject: subjectLine,
                html,
            }),
        })

        if (!resp.ok) {
            const body = await resp.text().catch(() => '')
            console.error('[Mail]', resp.status, body)
            return res.status(502).json({ error: 'Failed to send email' })
        }

        return res.json({ ok: true })
    } catch (err) {
        console.error('[ContactHandler]', err)
        return res.status(500).json({ error: 'Server error' })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Contact service listening on ${PORT}`))
