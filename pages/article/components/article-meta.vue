<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }" class="author">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary"
    :class="{
      active: article.author,following
    }">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow Eric Simons <span class="counter">({{ article.author.username }})</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary"
    :class="{
      active: article.author.favorited
    }">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{ article.author.username }})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      // 参数是必须的
      required: true
    }
  }
}
</script>

<style>

</style>