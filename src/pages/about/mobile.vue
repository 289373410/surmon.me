<template>
  <div class="about-page">
    <page-banner
      :position="70"
      :blur="false"
      :is-mobile="true"
      image="/images/page-lens/banner-1.jpg"
    >
      <template #title>
        <i18n :lkey="LANGUAGE_KEYS.PAGE_ABOUT" />
      </template>
    </page-banner>
    <div class="profile">
      <div class="gravatar">
        <uimage class="avatar" :src="adminInfo?.gravatar || '/images/gravatar.png'" />
      </div>
      <h2 class="name">{{ adminInfo?.name || '-' }}</h2>
      <h5 class="slogan">{{ adminInfo?.slogan || '-' }}</h5>
      <divider dashed />
      <h4 class="bio" :class="language">
        <i18n v-bind="i18ns.biography" />
      </h4>
    </div>
    <div class="links">
      <div class="list col-2">
        <router-link class="item text-only" :to="getPageRoute(RouteName.Job)">
          <i class="iconfont icon-horse" />
          <i18n v-bind="i18ns.findJob" />
        </router-link>
        <router-link class="item text-only" :to="getPageRoute(RouteName.Freelancer)">
          <i class="iconfont icon-tool" />
          <i18n v-bind="i18ns.hireMe" />
        </router-link>
        <router-link class="item text-only" :to="getPageRoute(RouteName.Lens)">
          <i class="iconfont icon-lens" />
          <i18n v-bind="i18ns.followMe" />
        </router-link>
        <router-link class="item text-only" :to="getPageRoute(RouteName.Merch)">
          <i class="iconfont icon-rubik" />
          <i18n v-bind="i18ns.merchBar" />
        </router-link>
      </div>
      <divider dashed />
      <div class="list col-2">
        <ulink class="item qq" :href="VALUABLE_LINKS.QQ_GROUP">
          <i class="iconfont icon-qq" />
          <i18n v-bind="i18ns.QQGroup" />
        </ulink>
        <ulink class="item telegram" :href="VALUABLE_LINKS.TELEGRAM_GROUP">
          <i class="iconfont icon-telegram" />
          <i18n v-bind="i18ns.TelegramGroup" />
        </ulink>
      </div>
    </div>
    <div class="links">
      <div class="list col-3">
        <ulink class="item github" :href="VALUABLE_LINKS.GITHUB">
          <i class="iconfont icon-github" />
          <span class="text">GitHub</span>
        </ulink>
        <ulink class="item twitter" :href="VALUABLE_LINKS.TWITTER">
          <i class="iconfont icon-twitter" />
          <span class="text">Twitter</span>
        </ulink>
        <ulink class="item instagram" :href="VALUABLE_LINKS.INSTAGRAM">
          <i class="iconfont icon-instagram" />
          <span class="text">Instagram</span>
        </ulink>
      </div>
      <divider dashed />
      <div class="list col-5">
        <ulink class="item telegram icon-only" :href="VALUABLE_LINKS.TELEGRAM">
          <i class="iconfont icon-telegram" />
        </ulink>
        <ulink class="item linkedin icon-only" :href="VALUABLE_LINKS.LINKEDIN">
          <i class="iconfont icon-linkedin" />
        </ulink>
        <ulink class="item douban icon-only" :href="VALUABLE_LINKS.DOUBAN">
          <i class="iconfont icon-douban" />
        </ulink>
        <ulink class="item bilibili icon-only" :href="VALUABLE_LINKS.BILIBILI">
          <i class="iconfont icon-bilibili" />
        </ulink>
        <ulink class="item zhihu icon-only" :href="VALUABLE_LINKS.ZHIHU">
          <i class="iconfont icon-zhihu" />
        </ulink>
      </div>
    </div>
    <div class="links">
      <div class="list col-2">
        <uimage cdn class="image-item" src="/images/page-about/wechat.jpg" />
        <uimage cdn class="image-item" src="/images/page-lens/wechat-channel.jpg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useMetaStore } from '/@/store/meta'
  import { RouteName } from '/@/app/router'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getPageRoute } from '/@/transforms/route'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import PageBanner from '/@/components/common/banner.vue'
  import Divider from '/@/components/common/divider.vue'
  import { useAboutPageMeta, i18ns } from './helper'

  export default defineComponent({
    name: 'MobileAboutPage',
    components: {
      PageBanner,
      Divider
    },
    setup() {
      const { i18n } = useEnhancer()
      const metaStore = useMetaStore()
      const adminInfo = computed(() => metaStore.adminInfo.data)

      // meta
      useAboutPageMeta()

      return {
        i18ns,
        language: i18n.language,
        adminInfo,
        RouteName,
        getPageRoute,
        LANGUAGE_KEYS,
        VALUABLE_LINKS
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .about-page {
    .banner {
    }

    .profile {
      position: relative;
      padding: $lg-gap;
      padding-top: $gap * 6;
      border-bottom-left-radius: $lg-radius;
      border-bottom-right-radius: $lg-radius;
      background-color: $module-bg-opaque;
      &::before {
        content: '';
        position: absolute;
        display: block;
        height: 1rem;
        bottom: -0.5rem;
        left: 0;
        right: 0;
        background-image: radial-gradient(circle, transparent 70%, $module-bg-opaque 70%);
        background-size: 0.7em 1em;
        background-position: 0 -0.5em;
      }

      .gravatar {
        width: 100%;
        position: absolute;
        top: -$gap * 3;
        left: 0;
        text-align: center;

        .avatar {
          $size: 7rem;
          width: $size;
          height: $size;
          z-index: $z-index-normal + 2;
          border-radius: 100%;
          border: 4px solid $module-bg-opaque;
          box-sizing: content-box;
        }
      }

      .name,
      .slogan {
        text-align: center;
        margin-top: 0;
        margin-bottom: $gap;
      }

      .bio {
        margin: 0;
        font-family: 'webfont-bolder', DINRegular;
        line-height: $line-height-base * 1.4;
        text-align: center;
        &.en {
          font-weight: bold;
        }
      }
    }

    .links {
      margin-top: $lg-gap;
      padding: $gap;
      border-radius: $lg-radius;
      background-color: $module-bg-opaque;
      overflow: hidden;

      .list {
        display: grid;
        grid-gap: $lg-gap;

        &.col-2 {
          grid-template-columns: repeat(2, 1fr);
        }
        &.col-3 {
          grid-template-columns: repeat(3, 1fr);
        }
        &.col-5 {
          grid-template-columns: repeat(5, 1fr);
        }

        .image-item {
          max-width: 100%;
        }

        .item {
          display: inline-flex;
          align-items: center;
          height: 3rem;
          padding: 0 $gap;
          border-radius: $sm-radius;
          color: $white;
          &.text-only {
            background-color: $surmon;
          }
          &.icon-only {
            justify-content: center;
            .iconfont {
              font-size: $font-size-h3;
              margin: 0;
            }
          }

          .iconfont {
            margin-right: $sm-gap;
          }

          &.github {
            background-color: $github-primary;
          }
          &.twitter {
            background-color: $twitter-primary;
          }
          &.instagram {
            background: $instagram-primary;
            background: $instagram-gradient;
            @include visibility-transition();
          }
          &.qq {
            background-color: $qq-primary;
          }
          &.telegram {
            background-color: $telegram-primary;
          }
          &.douban {
            background-color: $douban-primary;
          }
          &.zhihu {
            background-color: $zhihu-primary;
          }
          &.weibo {
            background-color: $weibo-primary;
          }
          &.bilibili {
            background-color: $bilibili-pink-primary;
          }
          &.stackoverflow {
            background-color: $stackoverflow-primary;
          }
          &.algorithm {
            background-color: $leetcode-primary;
          }
          &.quora {
            background-color: $quora-primary;
          }
          &.linkedin {
            background-color: $linkedin-primary;
          }
        }
      }
    }
  }
</style>
