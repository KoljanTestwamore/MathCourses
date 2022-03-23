<script lang="ts">
	import { Router, Route} from "svelte-routing";
	import Footer from './components/Footer.svelte';
	import Game from "./components/Game.svelte";
	import Header from './components/Header.svelte';
import KidsModeContainer from "./components/KidsModeContainer.svelte";
	import Landing from './components/Landing.svelte';
	import {questions} from './stubs';
</script>


<Router url="https://koljantestwamore.github.io/MathCourses/">
	<Route path="/" >
		<Header />
		<Landing />
		<Footer />
	</Route>
	<Route path="/game" >
		<KidsModeContainer>
			<Game questions={questions} />
		</KidsModeContainer>
	</Route>
</Router>