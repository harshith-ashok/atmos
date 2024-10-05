<script>
	import '../app.css';
</script>

<div class="p-5">
	<div class="navbar bg-base-100">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/>
					</svg>
				</div>
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-mono"
				>
					<li><a href="/">Home</a></li>
					<li><a href="about">About</a></li>
					<li><a href="/weather">Weather</a></li>
				</ul>
			</div>
			<a
				class="btn btn-ghost text-xl bg-gradient-to-r from-slate-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient"
				href="/">atmos</a
			>
		</div>
		<div class="navbar-end hidden lg:flex">
			<ul class="menu menu-horizontal px-1 font-mono">
				<li><a href="/">Home</a></li>
				<li><a href="about">About</a></li>
				<li><a href="/weather">Weather</a></li>
			</ul>
		</div>
	</div>
	<slot />
</div>
