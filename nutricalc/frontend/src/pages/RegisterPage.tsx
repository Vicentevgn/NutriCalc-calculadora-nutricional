import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../services/api";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    function validateEmail(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }

    async function handleRegister(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        // Nome vazio
        if (!name.trim()) {
            setError("Digite seu nome");
            return;
        }

        // Email inválido
        if (!validateEmail(email)) {
            setError("Digite um e-mail válido");
            return;
        }

        // Senha pequena
        if (password.length < 6) {
            setError("A senha deve possuir no mínimo 6 caracteres");
            return;
        }

        // Senhas diferentes
        if (password !== confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        try {
            await api.post("/auth/register", {
                name,
                email,
                password,
            });

            alert("Conta criada com sucesso!");

            navigate("/login");
        } catch (error: any) {
            // Email duplicado
            if (
                error.response?.status === 400 ||
                error.response?.status === 409
            ) {
                setError("Já existe uma conta cadastrada com este e-mail");
                return;
            }

            setError("Erro ao criar conta");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center p-6">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100 grid lg:grid-cols-2">

                {/* Lado esquerdo */}
                <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-600 to-green-500 text-white p-12 relative overflow-hidden">

                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute w-72 h-72 bg-white rounded-full -top-16 -left-16"></div>
                        <div className="absolute w-96 h-96 bg-white rounded-full -bottom-40 -right-20"></div>
                    </div>

                    <div className="relative z-10">
                        <h1 className="text-5xl font-bold tracking-tight">
                            NutriCalc
                        </h1>

                        <p className="mt-5 text-emerald-100 text-lg leading-relaxed">
                            Comece agora a criar receitas nutricionais completas e gere
                            rótulos profissionais automaticamente.
                        </p>

                        <div className="mt-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                                <span>Gestão inteligente de receitas</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                                <span>Tabela nutricional automática</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                                <span>Compatível com ANVISA</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulário */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-gray-800">
                            Criar conta
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Cadastre-se para começar a usar o NutriCalc.
                        </p>
                    </div>

                    <form
                        onSubmit={handleRegister}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome"
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                E-mail
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seuemail@email.com"
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition"
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
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmar senha
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-2xl text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-semibold transition shadow-lg shadow-emerald-200"
                        >
                            Criar conta
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Já possui conta?{" "}
                        <Link
                            to="/login"
                            className="text-emerald-600 font-semibold hover:underline"
                        >
                            Fazer login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}