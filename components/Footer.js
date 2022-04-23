import React from "react";
import Image from "next/image"

export default () => {
    return (
        <div id="footer" class="pt-3 pb-3">
            <Image src="/images/logo.png" width="50" height="50" />
            <div>© 2022 DeCharity </div>
        </div>
    )
}