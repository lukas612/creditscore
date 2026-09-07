# CreditScore

Landing + quiz de "puntuación crediticia" pensado como canal de captación alternativo
al de las landings de pago: en vez de pedir directamente una solicitud de préstamo, se
ofrece un test gratuito que calcula una puntuación orientativa y captura el lead
(nombre, email, teléfono) para pasarlo al equipo comercial.

Las preguntas del quiz están basadas en los campos reales usados en el funnel de
solicitud de crédito (importe, plazo, ingresos, deudas, vivienda, edad, código postal),
condensadas a ~9-10 pasos para maximizar la conversión del test.

## Stack

- **Frontend**: Vite + React + TypeScript, sin backend propio.
- **Datos**: Supabase (proyecto `creditscore`, región eu-west-3).
  - `quiz_sessions`: una fila por intento de quiz (respuestas + score).
  - `leads`: se crea solo cuando la persona desbloquea su resultado dejando sus datos.
  - `scoring_rules`: pesos del cálculo heurístico. No es accesible desde el cliente;
    solo la función `calculate_score` (SECURITY DEFINER) puede leerla, así el frontend
    nunca ve la fórmula de puntuación.
- El scoring es una heurística de marketing (base 300-850 estilo FICO), **no** un
  scoring bancario real ni una decisión de crédito.

## Desarrollo local

```bash
npm install
cp .env.example .env   # ya viene con la URL y la clave pública del proyecto
npm run dev
```

## Ajustar la fórmula de puntuación

Las reglas viven en la tabla `scoring_rules` de Supabase (columna `config`, en JSON).
Cambiarlas ahí no requiere desplegar código nuevo.

## Pendiente / siguientes pasos

- Definir marca/dominio definitivo y desplegar (Vercel/Netlify recomendado para un SPA Vite).
- Conectar el lead capturado en `leads` con el CRM/pingtree interno.
- Sustituir el enlace de "Hablar con un asesor" en `ResultFull` por el destino real.
