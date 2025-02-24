import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User } from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  const [isQuestsInputOpen, setIsQuestsInputOpen] = useState(false);
  const [isQuestsModalOpen, setIsQuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailToInvite, setEmailToInvite] = useState(["email@teste.com"]);

  function handleQuestsInputOpen() {
    return setIsQuestsInputOpen(true);
  }

  function handleQuestsInputClose() {
    return setIsQuestsInputOpen(false);
  }

  function handleQuestsModalOpen() {
    return setIsQuestsModalOpen(true);
  }

  function handleQuestsModalClose() {
    return setIsQuestsModalOpen(false);
  }

  function handleConfirmModalOpen() {
    return setIsConfirmTripModalOpen(true);
  }

  function handleConfirmModalClose() {
    return setIsConfirmTripModalOpen(false);
  }

  function handleAddNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailToInvite.includes(email)) {
      return;
    }

    setEmailToInvite([...emailToInvite, email]);

    event.currentTarget.reset();
  }

  function handleRemoveEmailFromInvite(emailToRemove: string) {
    const newEmailList = emailToInvite.filter((email) => email !== emailToRemove);

    setEmailToInvite(newEmailList);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input disabled={isQuestsInputOpen} className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" placeholder="Para onde você vai?" />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input disabled={isQuestsInputOpen} className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" type="text" placeholder="Quando?" />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {isQuestsInputOpen ? (
              <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-950" onClick={handleQuestsInputClose}>
                Alterar local/data <Settings2 className="size-5" />
              </button>
            ) : (
              <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400" onClick={handleQuestsInputOpen}>
                Continuar
              </button>
            )}
          </div>

          {isQuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button type="button" onClick={handleQuestsModalOpen} className="flex items-center gap-2 flex-1 text-left">
                <UserRoundPlus className="size-5 text-zinc-400" />
                <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" placeholder="Quem estará na viagem?" />
              </button>

              <div className="w-px h-6 bg-zinc-800" />

              <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400" onClick={() => setIsConfirmTripModalOpen(true)}>
                Confirmar Viagem
                <ArrowRight className="size-5 text-lime-950" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>
          e
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade.
          </a>
        </p>
      </div>

      {isQuestsModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar Convidados</h2>
                <button onClick={() => setIsQuestsModalOpen(false)}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {emailToInvite.map((email) => {
                return (
                  <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                    <span className="text-zinc-300">{email}</span>
                    <button>
                      <X
                        className="size-5 text-zinc-400"
                        onClick={() => {
                          handleRemoveEmailFromInvite(email);
                        }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form onSubmit={handleAddNewEmailToInvite} className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-2">
              <div className="px-2 flex items-center flex-1 gap-2">
                <AtSign className="text-zinc-400 size-5" />
                <input type="email" name="email" placeholder="Digite o e-mail do convidado" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
              </div>

              <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Convidar
                <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {isConfirmTripModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
                <button onClick={() => setIsConfirmTripModalOpen(false)}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
              </p>
            </div>

            <form onSubmit={handleAddNewEmailToInvite} className="space-y-3">
              <div className="h-14 px-4 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="text-zinc-400 size-5" />
                <input type="email" name="email" placeholder="Seu nome Completo" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
              </div>

              <div className="h-14 px-4 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="text-zinc-400 size-5" />
                <input type="email" name="email" placeholder="Seu e-mail pessoal" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
              </div>

              <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex justify-center items-center gap-2 w-full hover:bg-lime-400">
                Confirmar criação
                <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
