import React from "react";

export default function Footer() {
    return (
        <div className="footer" style={{
            height: "300px",
            padding: "30px",
            background: '#EAF9FE',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr'
        }}>
            <div className='vertical-bar' style={{
                borderLeft: "2px",
                height: "90%",
                width: '5px',
                background: '#f0f0f5'
            }} />

            <div className='about-us' style={{
                padding: "10px",
                textAlign: "center"
            }}>
                <h3><b>About DeCharity</b></h3>
                <br/>
                <p4>
                    We leverage Blockchain technology to support projects globally 
                    and support both creators and supporters through our transparent
                    donation platform.
                </p4>
            </div>

            <div className='vertical-bar' style={{
                borderLeft: "2px",
                height: "90%",
                width: '5px',
                background: '#f0f0f5'
            }}/>

            <div className='contact-us' style={{
                padding: "10px"
            }}>
                <h3><b>Contact Us!</b></h3>
                <br />
                <h4>Contact</h4>
                <a href="mailto:contact@decharity.com?subject=I%20Have%20A%20Concern">contact@decharity.com</a>
                <br />
                {/* These emails don't exist (probably) but they're here for nice looking placeholders. */}
                <h4>Technical Support</h4>
                <a href="mailto:support@decharity.com">support@decharity.com</a>
            </div>

            <div className='vertical-bar' style={{
                borderLeft: "2px",
                height: "90%",
                width: '5px',
                background: '#f0f0f5'
            }}/>

            <div className='information' style={{
                padding: "10px"
            }}>
                <h3><b>Information</b></h3>
                <ul className='info-list'>
                    <li>FAQ</li>
                    <li><a href="https://metamask.io/">Metamask</a></li>
                    {/* Bottom two don't exist; we don't have the legal presence to create or enforce them.
                        This is for the sake of presentation. */}
                    <li>Privacy Policy</li>
                    <li>Terms and Conditions</li>
                </ul>
            </div>

            <footer className="py-5 bg-dark fixed-bottom">
                <div className="container">
                    <p className="m-0 text-center text-white">
                        Copyright &copy; DeCharity 2021-2022
                    </p>
                </div>
            </footer>
        </div>
    );
};

