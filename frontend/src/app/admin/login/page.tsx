"use client";
import LoginForm from "./LoginForm";
import Redirection from "./Redirection";
import React, { Suspense, useState } from "react";

export default function Page() {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Redirection setIsLogin={setIsLogin} />
            {!isLogin && <LoginForm />}
        </Suspense>
    );
}
