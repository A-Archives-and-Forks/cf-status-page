<script lang="ts">
  export let location: string;
  export let avg: number;

  import { locations } from './locations';
  const locationMap = locations as Record<string, string>;
</script>

<br />
<small>
  {locationMap[location] || location}: {avg}ms
</small>
