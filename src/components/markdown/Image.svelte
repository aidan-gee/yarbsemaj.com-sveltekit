<script>
  export let href = "";
  export let title = undefined;
  export let text = "";
</script>

{#if title}
<figure class="figure">
  <img
    src="{href}"
    class="figure-img img-fluid rounded"
    alt="{text}"
  />
  <figcaption class="figure-caption">{title}</figcaption>
</figure>
{:else}
<img class="img-fluid rounded" src={href} {title} alt={text} />
{/if}
