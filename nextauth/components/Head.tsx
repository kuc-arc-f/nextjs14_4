"use client";

import { signOut } from 'next-auth/react';
//import {Link } from 'react-router-dom';
//
function Page() {
    return (
    <div>
        <a href="/">[ Home ]</a>
        <button className="ms-2" onClick={() => signOut({ callbackUrl: '/' })}>
        [ Logout ]
        </button>
        <br />
    </div>
    );
}
export default Page;
