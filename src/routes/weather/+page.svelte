<script>
	// @ts-nocheck

	import { createEventDispatcher, onMount } from 'svelte';

	/**
	 * @type {number | null}
	 */
	let temperature = null;
	/**
	 * @type {string | null}
	 */
	let cityName = 'Chennai';
	/**
	 * @type {number}
	 */
	let fl_like = 0;
	/**
	 * @type {number}
	 */
	let wind = 0;
	/**
	 * @type {number | null}
	 */
	let cloud = null;
	/**
	 * @type {number | string}
	 */
	let master = 0;
	/**
	 * @type {string | string}
	 */
	let icn = '';
	/**
	 * @type {{ list: any; } | null}
	 */
	let forecastData = null;
	let selectedCity = 'Chennai';

	// let city = 'Chennai';
	const dispatch = createEventDispatcher();
	onMount(async () => {
		await fetchWeatherData(selectedCity);
	});

	/**
	 * @param {string} city
	 */
	async function fetchWeatherData(city) {
		const apiKey = 'd97e8572d9b72af26f178499297a47cd';

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
		master = data.main;
		fl_like = data.main.feels_like;
		cloud = data.weather[0].description;
		wind = data.wind.speed;
		icn = data.weather[0].icon;
	}
	$: fetchWeatherData(selectedCity);
	let user = {
		ageRange: 0
	};

	let onChangeAgeRange = 0;

	const onChange = () => {
		onChangeAgeRange = user.ageRange;
	};
</script>

<div>
	<div class="">
		<div class="text-center text-[20vh] text-gray-400 font-thin font-mont">
			{#if temperature}
				{Math.round(temperature)}°
			{:else}
				<span class="loading loading-spinner loading-lg"></span>
			{/if}
		</div>
		<!-- <img
			src={`http://openweathermap.org/img/wn/${icn}@2x.png`}
			alt="Weather icon"
			class="w-16 h-16 mx-auto"
		/> -->
	</div>
	<div class="text-center text-4xl text-gray-800 font-normal font-mont capitalize">
		{#if cloud}
			{cloud}
		{/if}
	</div>
	<!-- <div class="flex pt-5 justify-center join join-vertical lg:join-horizontal">
	<button class="btn btn-outline join-item" on:click={() => (selectedCity = 'Chennai')}
		>Chennai</button
	>
	<button class="btn btn-outline join-item" on:click={() => (selectedCity = 'Mumbai')}
		>Mumbai</button
	>
	<button class="btn btn-outline join-item" on:click={() => (selectedCity = 'Delhi')}>Delhi</button>
</div> -->
	<div class="flex pt-5 justify-center join join-vertical md:join-horizontal lg:join-horizontal">
		<button
			class="btn btn-outline join-item"
			on:click={() => (selectedCity = 'Mumbai')}
			class:btn-error={selectedCity === 'Mumbai'}>Mumbai</button
		>
		<button
			class="btn btn-outline join-item"
			on:click={() => (selectedCity = 'Chennai')}
			class:btn-error={selectedCity === 'Chennai'}>Chennai</button
		>
		<button
			class="btn btn-outline join-item"
			on:click={() => (selectedCity = 'Delhi')}
			class:btn-error={selectedCity === 'Delhi'}>Delhi</button
		>
		<button
			class="btn btn-outline join-item"
			on:click={() => (selectedCity = 'New York')}
			class:btn-error={selectedCity === 'New York'}>New York</button
		>
		<button
			class="btn btn-outline join-item"
			on:click={() => (selectedCity = 'London')}
			class:btn-error={selectedCity === 'London'}>London</button
		>
	</div>
	<div class="container mx-auto mt-10 px-10">
		<div
			class="mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-base rounded-md py-4 border shadow-sm hover:shadow-lg"
		>
			<div>
				<h2 class="text-center text-xl font-mono font-bold pb-2">Feels Like</h2>
				<p class="text-center text-5xl font-mont capitalize tracking-tight py-4 text-gray-700">
					{Math.round(fl_like)}°
				</p>
			</div>
			<div>
				<h2 class="text-center text-xl font-mono font-bold pb-2">Humidity</h2>
				<p class="text-center text-5xl font-mont capitalize tracking-tight py-4 text-gray-700">
					{master.humidity} <span class="text-[16px] normal-case tracking-normal">%</span>
				</p>
			</div>
			<div>
				<h2 class="text-center text-xl font-mono font-bold pb-2">Pressure</h2>
				<p class="text-center text-5xl font-mont capitalize tracking-tight py-4 text-gray-700">
					{Math.round(master.pressure / 100)}
					<span class="text-[16px] normal-case tracking-normal">pa</span>
				</p>
			</div>
			<div>
				<h2 class="text-center text-xl font-mono font-bold pb-2">Wind</h2>
				<p class="text-center text-5xl font-mont capitalize tracking-tight py-4 text-gray-700">
					{wind} <span class="text-[16px] normal-case tracking-normal">m-sec</span>
				</p>
			</div>
		</div>
	</div>

	<div class="container mx-auto px-10 py-10">
		{#if forecastData}
			<div class="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
				{#each forecastData.list as forecast}
					<div class="bg-base rounded-md p-4 border shadow-sm hover:shadow-lg">
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
</div>
