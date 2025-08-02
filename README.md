# 💸 DR Finance

**DR Finance** es una aplicación móvil simple, moderna y offline para el **control financiero familiar**. Diseñada especialmente para familias que desean organizar sus ingresos y gastos de forma fácil, sin necesidad de conexión a internet.

---

## 📲 Características principales

- ✅ Registro de **ingresos** y **gastos** por persona.
- ✅ Clasificación por **categoría** y **frecuencia** (mensual, trimestral, anual o puntual).
- ✅ Visualización del **saldo total mensual** calculado automáticamente.
- ✅ **Resumen por categoría** para entender en qué se está gastando.
- ✅ App completamente **offline**, sin necesidad de internet ni login.
- ✅ Base de datos local utilizando **SQLite**.
- ✅ Compatible con Android (versión APK disponible).

---

## 🧠 ¿Para quién fue creada?

Esta app fue pensada para familias como la mía:  
👨‍👩‍👧‍👦 Donde cada miembro tiene ingresos y gastos, y necesitamos ver claramente cuánto entra, cuánto sale y en qué.

Ideal para:
- Personas que quieren tener **control real del dinero sin complicaciones**.
- Familias que desean **organizar su economía doméstica** de forma colectiva.
- Usuarios que valoran la privacidad y **prefieren apps sin conexión ni registro obligatorio**.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Descripción |
|------------|-------------|
| React      | Para el desarrollo de la interfaz móvil. |
| Capacitor  | Para compilar y generar APK para Android. |
| SQLite     | Base de datos local para almacenamiento offline. |
| JavaScript / HTML / CSS | Estructura del frontend. |

---

## 📦 Instalación local (modo desarrollador)

```bash
git clone https://github.com/isaiasdaniel/dr-finance.git
cd dr-finance
npm install
npx cap sync android
npx cap open android
