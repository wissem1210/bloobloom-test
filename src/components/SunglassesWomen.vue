<template>
  <div class="collection-page" style="border: '1px solid #000'">
    <div class="collection-item first"></div>
    <div class="collection-item collection-title">SUNGLASSES MEN</div>
    <div class="collection-item" style="justify-content: flex-start">
      <span class="filter" @click="colourFilter = !colourFilter">COLOUR</span
      ><span class="filter" @click="shapeFilter = !shapeFilter">SHAPE</span>
    </div>
  </div>

  <div v-show="colourFilter">
    <router-link class="filter-list" :to="collectionLink">
      <div
        class="colour-div"
        v-for="c in colourOptions"
        :key="c"
        @click="setColourFilter(c.colour)"
      >
        <div
          class="colour-cover"
          :class="{ filter_border: colour.includes(c.colour) }"
        >
          <div
            class="image"
            :style="{ backgroundImage: 'url(' + c.url + ')' }"
          ></div>
        </div>
        <span>{{ c.colour }}</span>
      </div>
    </router-link>
  </div>
  <div v-show="shapeFilter">
    <router-link class="filter-list" :to="collectionLink">
      <div
        class="shape-div"
        v-for="s in shapeOptions"
        :key="s"
        @click="setShapeFilter(s)"
        :class="{ filter_underline: shape.includes(s) }"
      >
        {{ s }}
      </div>
    </router-link>
  </div>
  <router-link
    class="filter-list"
    :to="collectionLink"
    v-show="[...colour, ...shape].length > 0"
  >
    <div
      class="filter"
      v-for="f in [...colour, ...shape]"
      :key="f"
      @click="removeFilter(f)"
    >
      {{ f }}<stroke-icon />
    </div>
  </router-link>

  <div class="collection-page">
    <collection-card
      class="collection-item"
      v-for="g in glasses"
      :key="g.id"
      :name="g.name"
      :url="g.glass_variants[0].media[0].url"
    >
    </collection-card>
  </div>
</template>

<script>
import CollectionCard from "./CollectionCard.vue";
import StrokeIcon from "../icons/Stroke.vue";

export default {
  data() {
    return {
      colour: [],
      colourOptions: [
        {
          colour: "black",
          url: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_black_01.png",
        },
        {
          colour: "tortoise",
          url: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_tortoise_02.png",
        },
        {
          colour: "coloured",
          url: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_coloured_03.png",
        },
        {
          colour: "crystal",
          url: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_crystal_04.png",
        },
        {
          colour: "dark",
          url: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_dark_05.png",
        },
        {
          colour: "bright",
          url: "https://d32y5z2afvomc1.cloudfront.net/assets/filters_bright_06.png",
        },
      ],
      shapeOptions: ["sqaure", "rectangle", "round", "cat-eye"],
      shape: [],
      lens_variant_prescriptions: "fashion",
      lens_variant_types: "classic",
      frame_variant_home_trial_available: false,
      glasses: [],
      page: 1,
      limit: null,
      colourFilter: false,
      shapeFilter: false,
      colourQuery: null,
      shapeQuery: null,
      queryUrl: "",
    };
  },
  components: { CollectionCard, StrokeIcon },
  methods: {
    loadGlasses() {
      fetch(
        // eslint-disable-next-line
        `https://api.bloobloom.com/user/v1/sales_channels/website/collections/sunglasses-men/glasses?sort\[type\]=collection_relations_position&sort\[order\]=asc&filters\[lens_variant_prescriptions\]\[\]=fashion&filters\[lens_variant_types\]\[\]=classic&page\[limit\]=12&page\[number\]=${this.page}&filters\[frame_variant_home_trial_available\]=false${this.queryUrl}`
      ).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            this.limit = data.meta.total_count;
            const collection = data.glasses;
            for (const g of collection) {
              this.glasses.push(g);
            }
            if (this.glasses.length < this.limit) {
              this.page++;
              this.loadGlasses();
            }
            return this.glasses;
          });
        }
      });
    },
    setQueryParams() {
      this.colourQuery = this.$route.query?.colour?.split("~");

      this.shapeQuery = this.$route.query?.shape?.split("~");

      if (this.colourQuery != undefined) {
        this.colour = [...this.colourQuery];
        for (const c of this.colourQuery) {
          this.queryUrl +=
            // eslint-disable-next-line
            "&filters\[glass_variant_frame_variant_colour_tag_configuration_names\]\[\]=" +
            c;
        }
      }
      if (this.shapeQuery != undefined) {
        this.shape = [...this.shapeQuery];

        for (const s of this.shapeQuery) {
          this.queryUrl +=
            // eslint-disable-next-line
            "&filters\[glass_variant_frame_variant_frame_tag_configuration_names\]\[\]=" +
            s;
        }
      }
    },

    setColourFilter(colour) {
      if (this.colour.includes(colour)) {
        this.colour.splice(
          this.colour.findIndex((e) => e === colour),
          1
        );
      } else {
        this.colour.push(colour);
      }
    },
    setShapeFilter(shape) {
      if (this.shape.includes(shape)) {
        this.shape.splice(
          this.shape.findIndex((e) => e === shape),
          1
        );
      } else {
        this.shape.push(shape);
      }
    },
    removeFilter(filter) {
      if (this.shape.includes(filter)) {
        this.shape.splice(
          this.shape.findIndex((e) => e === filter),
          1
        );
      } else {
        this.colour.splice(
          this.colour.findIndex((e) => e === filter),
          1
        );
      }
    },
  },
  created() {
    this.setQueryParams();
    this.loadGlasses();
  },
  computed: {
    collectionLink() {
      if (this.colour.length > 0 && this.shape.length > 0) {
        return (
          "/sunglasses-men/" +
          "?colour=" +
          this.colour.join("~") +
          "&shape=" +
          this.shape.join("~")
        );
      } else if (this.colour.length > 0) {
        return "/sunglasses-men/" + "?colour=" + this.colour.join("~");
      } else if (this.shape.length > 0) {
        return "/sunglasses-men/" + "?shape=" + this.shape.join("~");
      } else {
        return "/sunglasses-men/";
      }
    },
  },
  watch: {
    "$route.query"() {
      this.queryUrl = "";
      this.setQueryParams();
      this.glasses = [];
      this.page = 1;
      this.setQueryParams();
      this.loadGlasses();
    },
  },
};
</script>

<style scoped>
.collection-page {
  position: relative;
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: flex-start;
  grid-template-columns: 33.33% 33.33% 33.33%;
}
.collection-item:nth-child(3n - 2) {
  border-left: none;
}
.collection-item {
  position: relative;
  width: 100%;
  min-height: 40px;
  display: flex;
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
  justify-content: center;
  align-items: center;
}
span.filter {
  border-right: 1px solid #000;
  height: 40px;
  display: flex;
  align-items: center;
  width: 150px;
  justify-content: center;
  cursor: pointer;
}
.filter-list {
  border-bottom: 1px solid #000;
  min-height: 40px;
  display: grid;
  grid-template-columns: 16.66% 16.66% 16.66% 16.66% 16.66% 16.66%;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  padding-left: 40px;
  text-decoration: none;
  color: #000;
}

.collection-title {
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
  text-transform: uppercase;
}
img {
  position: relative;
  display: block;
  height: auto;
  overflow: hidden;
}
.colour-div {
  cursor: pointer;
  height: 24px;
  margin: 11px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: #000;
}
.colour-cover {
  position: relative;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  margin-right: 7px;
  overflow: hidden;
}
.image {
  height: 16px;
  width: 16px;
  border-radius: 100%;
}
.filter_border {
  border: 1px solid #000;
}
.filter_underline {
  text-decoration: underline;
}
.shape-div {
  cursor: pointer;
}
.filter {
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
}
.first {
  display: auto;
}
@media screen and (max-width: 1319px) {
  .collection-page {
    grid-template-columns: 50% 50%;
  }
  .first {
    display: none;
  }
  .collection-item:nth-child(3n - 2) {
    border-left: 1px solid #000;
  }
}
@media screen and (max-width: 719px) {
  .collection-page {
    grid-template-columns: 100%;
  }
  .filter-list {
    grid-template-columns: 33.33% 33.33% 33.33%;
  }
}
</style>
