import { Resend } from 'resend'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, rating, review } = await request.json()

    // Validate required fields
    if (!name || !email || !rating || !review) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email to Julie
    const result = await resend.emails.send({
      from: 'noreply@juliedogcare.com',
      to: 'julie.ac.shimer@gmail.com',
      subject: `New Review from ${name}`,
      html: `
        <h2>New Review Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rating:</strong> ${'⭐'.repeat(parseInt(rating))} (${rating}/5)</p>
        <p><strong>Review:</strong></p>
        <p>${review}</p>
        <hr />
        <p><small>Please review and approve this submission before posting to your website</small></p>
        <p><small>This email was sent from your Julie's Dog Sitting website</small></p>
      `,
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      return Response.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return Response.json(
      { success: true, message: 'Review submitted successfully! Julie will review and approve it.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
