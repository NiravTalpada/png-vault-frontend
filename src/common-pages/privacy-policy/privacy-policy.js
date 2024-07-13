import "../privacy-policy/privacy-policy.css";
import { Container, Link, checkboxClasses } from "@mui/material";



export default function PrivacyPolicy() {

    return (
        <div className="privacypolicy-main">
            <Container>
                <h2>Privacy Policy</h2>
                
                <h3>Introduction</h3>
                <p>This Privacy Policy explains how we collect, use, and disclose personal information about you when you visit our website (PngValt) and use our services.</p>
                <ul>
                    <li>
                        <h4>Information We Collect</h4>
                        <p>  We collect personal information that you provide to us or by third party auth (Google, Facebook and Linkedin), such as your name, email address, and any other information you choose to provide.
                            We may also collect certain information automatically when you visit our website, such as your IP address, device type, and browser information.</p>
                    </li>
                    <li>
                        <h4>Information We don’t Collect</h4>
                        <p>We prioritize the security and privacy of our users. As such, we want to reassure you that we do not collect or store any payment details within our system. Instead, we utilize Razorpay, a trusted payment gateway, for the secure collection of payments. This ensures that your payment information is handled by a reputable third-party service provider, safeguarding your sensitive financial data.</p>
                    </li>
                    <li>
                        <h4>How We Use Your Information</h4>
                        <p>We may use the information we collect for various purposes, including to provide, maintain, and improve our services, to communicate with you, and to personalize your experience.
                            We may also use your information to analyze how our website is used and to detect, prevent, and address technical issues.</p>
                    </li>
                    <li>
                        <h4>Sharing Your Information</h4>
                        <p>We may share your personal information with third-party service providers who perform services on our behalf, such as hosting providers and analytics providers.
                            We may also disclose your personal information if required to do so by law or if you violate our Terms of Service.</p>
                    </li>
                    <li>
                        <h4>Advertising Partnerships</h4>
                        <p>We may engage in advertising partnerships to support our website. As part of these partnerships, we utilize Google AdSense, a third-party advertising service provided by Google Inc. Google AdSense may use cookies and similar technologies to display personalized advertisements based on your browsing activity and interests.</p>
                    </li>
                    <li>
                        <h4>How Google Uses Information from Sites or Apps That Use Their Services</h4>
                        <p>Google AdSense may collect certain information from users who visit our website, including but not limited to your IP address, device type, browsing history, and interactions with advertisements. This information is used to provide more relevant ads and to measure the effectiveness of advertising campaigns.</p>
                    </li>
                    <li>
                        <h4>Third-Party Disclosure</h4>
                        <p>Please note that while we strive to work with reputable advertising partners, we do not have control over the activities of these third-party advertisers. We encourage you to review the privacy policies of these advertisers for more information about their practices and how to opt out of personalized advertising.</p>
                    </li>
                    <li>
                        <h4>Changes to This Policy</h4>
                        <p>We reserve the right to amend this Privacy Policy to reflect changes in our practices or to comply with legal requirements. We encourage you to review this Privacy Policy periodically for any updates or changes.</p>
                    </li>
                    <li>
                        <h4>Security</h4>
                        <p>We take reasonable measures to protect your personal information from unauthorized access or disclosure.</p>
                    </li>
                    <li>
                        <h4>Your Choices</h4>
                        <p>You may opt out of receiving promotional communications from us by following the instructions in those communications or by contacting us directly.</p>
                    </li>
                    <li>
                        <h4>Contact Us</h4>
                        <p>If you have any questions or concerns about our Privacy Policy, please contact us at [Your Contact Information].</p>
                    </li>
                </ul>
            </Container>
        </div>
    )
}