const nodemailer=require('nodemailer')
async function sendEmail(email,message){
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.AUTH_EMAIL,
            pass:process.env.AUTH_PASSWORD
        }
    });

    const mailOptions={
        from:process.env.AUTH_EMAIL,
        to:email,
        subject:"Multi vendor app verification",
        html:`
            <h1>Food Email Verification</h1>
            <p>Your Verification code is:</p>
            <h2 style="color:blue;">${message}</h2>
            <p>Please enter this code on the verification page to complete your registration process</p>
            <p>If you did not make this request,please ignore this email.</p>
        `
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log("verification email sent")
    } catch (error) {
        console.log(error.message);
    }
}
module.exports=sendEmail