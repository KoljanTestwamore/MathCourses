<script lang="ts">
import { onDestroy } from 'svelte';

	import { lang } from '../stores';
    import { language } from '../types';
 
    export let values: [string, string];

    let value = values[0];

    const unsub = lang.subscribe(lang => 
        value = lang == language.RU ? values[0] : values[1]
    )

    onDestroy(unsub);
</script>

{value}
