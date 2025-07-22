// src/components/LoginForm.tsx
import AuthFormBase from "./AuthFormBase";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function LoginForm() {
  return (
    <AuthFormBase title="Acesse sua conta">
      <form>
        <Input type="email" placeholder="Email" required className="mb-4" />
        <Input type="password" placeholder="Senha" required className="mb-6" />
        <Button type="submit" className="w-full">Entrar</Button>
      </form>
    </AuthFormBase>
  );
}
