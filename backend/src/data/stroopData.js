export const stroopStimuli = [
  // Congruentes
  { palabra: "Rojo", color: "red", correcto: true, neutral: false },
  { palabra: "Verde", color: "green", correcto: true, neutral: false },
  { palabra: "Azul", color: "blue", correcto: true, neutral: false },
  { palabra: "Amarillo", color: "yellow", correcto: true, neutral: false },

  // Incongruentes
  { palabra: "Rojo", color: "green", correcto: false, neutral: false },
  { palabra: "Verde", color: "red", correcto: false, neutral: false },
  { palabra: "Azul", color: "yellow", correcto: false, neutral: false },
  { palabra: "Amarillo", color: "blue", correcto: false, neutral: false },

  // Neutrales
  { palabra: "Mesa", color: "red", correcto: false, neutral: true },
  { palabra: "Casa", color: "blue", correcto: false, neutral: true },
  { palabra: "Cielo", color: "green", correcto: false, neutral: true },
  { palabra: "Flor", color: "yellow", correcto: false, neutral: true },

  // Extras
  { palabra: "Verde", color: "blue", correcto: false, neutral: false },
  { palabra: "Rojo", color: "yellow", correcto: false, neutral: false },
  { palabra: "Amarillo", color: "red", correcto: false, neutral: false },
];
