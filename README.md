## atmos

**Description:**

Stay informed with accurate weather data powered by **OpenWeatherMap**. Our intuitive web app offers a minimalist design and interactive features, making it easy to find the weather information you need. From current conditions to daily forecasts, our app keeps you up-to-date and prepared for whatever the weather throws your way.

**Svelte Kit** is a modern JavaScript framework that builds fast and reactive web applications. **Tailwind CSS** is a utility-first CSS framework for rapid styling. daisyUI is a component library that extends **Tailwind CSS** with pre-built components. Together, they provide a powerful and efficient stack for building web applications.

Hosted with the help of **Vercel**

**Installation:**

1. Clone the repository:

```bash
git clone https://github.com/harshith-ashok/atmos.git
```

2. Install dependencies:

```bash
npm install
```

3. Change api key in `src/routes/weather/+page.svelte` line 50

```svelte
const apiKey = 'YOURAPIKEY';
```

**Usage:**

1. Replace `YOUR_API_KEY` in `src/App.svelte` with your OpenWeatherMap API key.
2. Run the development server:

```bash
npm run dev
```

**Demo:**

~~NGINX Hosting is underway and the link will be updated soon!~~

Visit `https://atmos-ashen.vercel.app` in your browser to see the application in action.
