<script>
	import { onMount } from 'svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<section class="p-5">
	<div
		class="text-center text-[10vh] font-headings font-bold tracking-wider font-bold bg-gradient-to-r from-slate-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient"
	>
		atmos
	</div>
	<div class="pb-5 text-center font-mono">Accurate forecasts, anytime, anywhere.</div>
	<div class="py-10 grid grid-auto gap-4 lg:w-[700px] lg:mx-auto">
		<div class="mockup mockup-code font-mono">
			<div class="px-10 pt-10">
				<span class="text-green-400">Objective:</span> A web application that uses the OpenWeatherMap
				API to provide accurate weather in a interactive and minimal way.
			</div>
			<div class="px-10 py-5">
				<span class="text-warning">Tech Stack:</span>
				<ul class="list-disc px-5">
					<li>Svelte Kit</li>
					<li>Tailwind CSS</li>
					<li>daisyUI</li>
				</ul>
			</div>
		</div>
		<a href="/weather" class="btn btn-outline w-60 mx-auto font-mono text-xl">Check Weather</a>
	</div>
</section>
