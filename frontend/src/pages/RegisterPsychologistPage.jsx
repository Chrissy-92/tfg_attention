import CardWhite from "../components/CardWhite";
import RegisterFormPsychologist from "../components/Login/RegisterFormPsychologist";
import BottomContainer from "../components/BottomContainer";
import Header from "../components/Header";

// Página para registrar a un nuevo psicólogo
export default function RegisterPsychologistPage() {
  return (
    <>
      <Header title="EduMind Kids" />
      <BottomContainer className="bg-gradient-to-br from-emerald-300 via-violet-300 to-pink-300">
        <CardWhite>
          <RegisterFormPsychologist />
        </CardWhite>
      </BottomContainer>
    </>
  );
}
