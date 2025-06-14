export const stroopStimuli = [
  // Estímulos congruentes (la palabra coincide con el color)
  { palabra: "Rojo", color: "red", correcto: true, neutral: false },
  { palabra: "Verde", color: "green", correcto: true, neutral: false },
  { palabra: "Azul", color: "blue", correcto: true, neutral: false },
  { palabra: "Amarillo", color: "yellow", correcto: true, neutral: false },
  { palabra: "Morado", color: "purple", neutral: false },
  { palabra: "Rosa", color: "pink", neutral: false },
  { palabra: "Naranja", color: "orange", neutral: false },
  { palabra: "Café", color: "brown", neutral: false },

  // Estímulos incongruentes (palabra y color no coinciden)
  { palabra: "Rojo", color: "green", correcto: false, neutral: false },
  { palabra: "Verde", color: "red", correcto: false, neutral: false },
  { palabra: "Azul", color: "yellow", correcto: false, neutral: false },
  { palabra: "Amarillo", color: "blue", correcto: false, neutral: false },
  { palabra: "Verde", color: "blue", correcto: false, neutral: false },
  { palabra: "Rojo", color: "yellow", correcto: false, neutral: false },
  { palabra: "Amarillo", color: "red", correcto: false, neutral: false },

  // Estímulos neutrales (la palabra no es un color)
  { palabra: "Manzana", color: "red", correcto: false, neutral: true },
  { palabra: "Cielo", color: "blue", correcto: false, neutral: true },
  { palabra: "Césped", color: "green", correcto: false, neutral: true },
  { palabra: "Plátano", color: "yellow", correcto: false, neutral: true },
];
