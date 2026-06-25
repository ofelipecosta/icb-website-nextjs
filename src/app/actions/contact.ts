"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const nome    = String(formData.get("nome") ?? "").trim();
  const email   = String(formData.get("email") ?? "").trim();
  const assunto = String(formData.get("assunto") ?? "").trim();
  const mensagem = String(formData.get("mensagem") ?? "").trim();

  if (!nome || !email || !assunto || !mensagem) {
    return { status: "error", message: "Preencha todos os campos." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "E-mail inválido." };
  }

  // TODO: substituir pelo envio real (Resend, SendGrid, Nodemailer, etc.)
  // Exemplo com Resend:
  // await resend.emails.send({
  //   from: "site@icb.org.br",
  //   to: "secretaria@icb.org.br",
  //   subject: `[Site] ${assunto}`,
  //   text: `De: ${nome} <${email}>\n\n${mensagem}`,
  // });

  console.log("[Contato ICB]", { nome, email, assunto, mensagem });

  return { status: "success" };
}
