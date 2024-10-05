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
	let sCity = 'Chennai';

	const onChange = () => {
		onChangeAgeRange = user.ageRange;
	};
</script>

<div>
	<div class="">
		<div
			class="text-center text-[20vh] font-thin font-mont bg-gradient-to-r from-slate-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient"
		>
			{#if temperature}
				{Math.round(temperature)}°
			{:else}
				<span class="loading loading-spinner loading-lg"></span>
			{/if}
		</div>
	</div>
	<div class="text-center text-4xl text-gray-800 font-normal font-mont capitalize">
		{#if cloud}
			{cloud}{:else}
			<span class="loading loading-spinner loading-lg"></span>
		{/if}
	</div>
	<div
		class="flex pt-5 justify-center join join-vertical md:join-horizontal lg:join-horizontal font-mono"
	>
		<button
			class="btn btn-outline join-item"
			on:click={() => (selectedCity = 'Mumbai')}
			class:btn-error={selectedCity === 'Mumbai'}>Mumbai</button
		>
		<button
			class="btn btn-outline join-item"
			on:click={() => (selectedCity = 'Delhi')}
			class:btn-error={selectedCity === 'Delhi'}>Delhi</button
		>
		<button
			class="btn btn-outline join-item"
			on:click={() => (selectedCity = 'Chennai')}
			class:btn-error={selectedCity === 'Chennai'}>Chennai</button
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
	<form on:submit={fetchWeatherData(selectedCity)} class="flex pt-5 justify-center gap-1">
		<input
			type="text"
			placeholder="Enter City"
			class="input input-bordered w-full max-w-xs font-mono"
			bind:value={sCity}
		/>
		<div class="tooltip" data-tip="City name as per Google Maps">
			<button class="btn btn-outline btn-info rounded-sm w-fill"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					class="bi bi-info"
					viewBox="0 0 16 16"
				>
					<path
						d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
					/>
				</svg></button
			>
		</div>
		<button type="submit" class="btn btn-outline font-mono" on:click={(selectedCity = sCity)}
			>Get Weather</button
		>
	</form>
	<div class="container mx-auto mt-10 px-10">
		<div
			class="mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-base rounded-md py-4 border shadow-sm hover:shadow-lg"
		>
			<div>
				<h2 class="text-center text-xl font-mono font-bold pb-2">Feels Like</h2>
				<p class="text-center text-5xl font-mont capitalize tracking-tight py-4 text-blue-300">
					{#if fl_like}
						{Math.round(fl_like)}{:else}
						<span class="loading loading-spinner loading-lg"></span>
					{/if}°
				</p>
			</div>
			<div>
				<h2 class="text-center text-xl font-mono font-bold pb-2">Humidity</h2>
				<p class="text-center text-5xl font-mont capitalize tracking-tight py-4 text-teal-400">
					{#if master.humidity}{master.humidity}{:else}
						<span class="loading loading-spinner loading-lg"></span>{/if}
					<span class="text-[16px] normal-case tracking-normal">%</span>
				</p>
			</div>
			<div>
				<h2 class="text-center text-xl font-mono font-bold pb-2">Pressure</h2>
				<p class="text-center text-5xl font-mont capitalize tracking-tight py-4 text-purple-400">
					{#if master.pressure}{Math.round(master.pressure / 100)}{:else}
						<span class="loading loading-spinner loading-lg"></span>{/if}
					<span class="text-[16px] normal-case tracking-normal">pa</span>
				</p>
			</div>
			<div>
				<h2 class="text-center text-xl font-mono font-bold pb-2">Wind</h2>
				<p class="text-center text-5xl font-mont capitalize tracking-tight py-4 text-gray-700">
					{#if wind}{wind}{:else}
						<span class="loading loading-spinner loading-lg"></span>{/if}
					<span class="text-[16px] normal-case tracking-normal">m-sec</span>
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
						<p class="text-lg text-center font-mono font-bold">
							{Math.round(forecast.main.temp)}°C
						</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
