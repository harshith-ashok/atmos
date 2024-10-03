<script>
	import { onMount } from 'svelte';

	/**
	 * @type {number | null}
	 */
	let temperature = null;
	/**
	 * @type {string | null}
	 */
	let cityName = null;
	/**
	 * @type {number | null}
	 */
	let fl_like = null;
	/**
	 * @type {number | null}
	 */
	let cloud = null;
	/**
	 * @type {{ list: any; } | null}
	 */
	let forecastData = null;

	onMount(async () => {
		const apiKey = 'd97e8572d9b72af26f178499297a47cd';
		const city = 'Chennai';

		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
		);
		const forecast = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
		);

		const data = await response.json();
		forecastData = await forecast.json();
		// @ts-ignore
		forecastData.list = forecastData.list
			// @ts-ignore
			.filter((forecast, index) => index % 8 === 0);

		temperature = data.main.temp;
		fl_like = data.main.feels_like;
		cloud = data.weather[0].description;
		cityName = city;
	});
</script>

<div class="text-center text-[20vh] text-gray-400 font-thin font-mont">
	{#if temperature}
		{Math.round(temperature)}°
	{:else}
		<span class="loading loading-spinner loading-lg"></span>
	{/if}
</div>
<div class="text-center text-4xl text-gray-800 font-normal font-mont capitalize">
	{#if cloud}
		{cloud}
	{/if}
</div>
<div class="pt-20 justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
	<div
		class="mx-auto text-center pb-4 text-xl italic text-gray-800 font-normal font-mont capitalize"
	>
		{#if fl_like}
			{Math.round(fl_like)}°
		{/if}
	</div>
</div>
<div class="container mx-auto px-10 py-10">
	{#if forecastData}
		<div class="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
			{#each forecastData.list as forecast}
				<div class="bg-white rounded-md p-4 border shadow-sm hover:shadow-lg">
					<h2 class="text-xl text-center font-mono font-bold">
						{new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
					</h2>
					<img
						src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
						alt="Weather icon"
						class="w-16 h-16 mx-auto"
					/>
					<p class="text-lg text-center font-mono capitalize tracking-tight">
						{forecast.weather[0].description}
					</p>
					<!-- <p class="text-lg text-center font-mono font-bold">{Math.round(forecast.main.temp)}°C</p> -->
				</div>
			{/each}
		</div>
	{/if}
</div>
