import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../services/api";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem(
                "@nutricalc:token",
                response.data.token
            );

            navigate("/dashboard");
        } catch (error) {
            alert("E-mail ou senha inválidos");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center p-6">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100 grid lg:grid-cols-2">

                <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-600 to-green-500 text-white p-12">
                    <div>
                        <h1 className="text-5xl font-bold">
                            NutriCalc
                        </h1>

                        <p className="mt-5 text-lg text-emerald-100">
                            Faça login para acessar seu dashboard nutricional.
                        </p>
                    </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-gray-800">
                            Entrar
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Acesse sua conta.
                        </p>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                E-mail
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seuemail@email.com"
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Senha
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-semibold transition"
                        >
                            Entrar
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Ainda não possui conta?{" "}
                        <Link
                            to="/register"
                            className="text-emerald-600 font-semibold hover:underline"
                        >
                            Criar conta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}