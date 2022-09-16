<template>
  <div>
    <b-card>
      <div class="date-container">
        <label for="startDate">시작일</label>
        <b-form-datepicker
          id="startDate"
          v-model="startDate"
        ></b-form-datepicker>
      </div>
      <div class="date-container">
        <label for="endDate">종료일</label>
        <b-form-datepicker id="endDate" v-model="endDate"></b-form-datepicker>
      </div>
      <div class="select-period-container">
        <b-form-select
          class="time-select"
          v-model="timeUnit"
          :options="timeUnitOptions"
        ></b-form-select>
      </div>
      <b-input-group class="group-name-container" prepend="그룹명">
        <b-form-input v-model="userInputGroupName"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-success" v-on:click="tempGroupAdd"
            >추가</b-button
          >
        </b-input-group-append>
      </b-input-group>
      <div class="printed-groupname-container" v-if="tempGroupName">
        {{ tempGroupName }}
      </div>
      <b-input-group class="keywords-container" prepend="키워드">
        <b-form-input v-model="userInputKeyword"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-success" v-on:click="tempKeywordAdd"
            >추가</b-button
          >
        </b-input-group-append>
      </b-input-group>
      <div class="printed-keywords-container" v-if="tempKeywords.length">
        {{ tempKeywords }}
      </div>
      <b-button class="make-group-btn" variant="success" v-on:click="makeGroup"
        >그룹 확정</b-button
      >
      <div v-if="keywordGroups.length">
        <h1>사용자 입력 그룹별 키워드</h1>
        <b-table striped hover :items="keywordGroups"></b-table>
      </div>
      <b-button class="submit-btn" variant="info" v-on:click="sendResultToApi"
        >제출</b-button
      >
    </b-card>
  </div>
</template>

<script>
import { dataLab } from "../utils/axios";
export default {
  name: "DataSendForm",
  data() {
    return {
      startDate: "",
      endDate: "",
      timeUnit: null,
      timeUnitOptions: [
        { value: null, text: "검색기준을 선택해주세요" },
        { value: "month", text: "월간" },
        { value: "week", text: "주간" },
        { value: "date", text: "일간" },
      ],
      keywordGroups: [],
      userInputGroupName: "",
      userInputKeyword: "",
      tempGroupName: "",
      tempKeywords: [],
      toApiData: {},
    };
  },
  methods: {
    tempGroupAdd() {
      this.tempGroupName = this.userInputGroupName;
    },
    tempKeywordAdd() {
      this.tempKeywords.push(this.userInputKeyword);
      this.userInputKeyword = "";
    },
    makeGroup() {
      this.keywordGroups.push({
        groupName: this.tempGroupName,
        keywords: this.tempKeywords,
      });
      this.tempGroupName = "";
      this.tempKeywords = [];
      this.userInputGroupName = "";
    },
    async sendResultToApi() {
      this.toApiData = {
        startDate: this.startDate,
        endDate: this.endDate,
        timeUnit: this.timeUnit,
        keywordGroups: this.keywordGroups,
      };
      await dataLab.post(this.toApiData);
      location.reload();
    },
  },
};
</script>

<style scoped>
.date-container,
.select-period-container,
.keywords-container,
.group-name-container,
.make-group-btn {
  margin-bottom: 10px;
}
.printed-groupname-container,
.printed-keywords-container {
  margin: 20px;
}
.time-select,
.make-group-btn,
.submit-btn {
  width: 100%;
}
</style>
