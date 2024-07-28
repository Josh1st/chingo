<template>
  <section v-if="started == false" class="align-items-center min-vh-100">
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="w-100">
        <button @click="start" class="btn btn-primary w-100 py-4" type="button" style="border-radius: 25px;font-size: 29px;font-family: Poppins, sans-serif;font-weight: 600;background: linear-gradient(90deg, black, #353535 50%, #000000 98%);">
          {{ numbers.length > 0 ? "Start New" : "Start" }}
        </button>
        <button
          v-if="numbers.length > 0"
          @click="resume"
          class="btn btn-primary w-100 py-4 mt-3" type="button"
          style="border-radius: 25px;font-size: 29px;font-family: Poppins, sans-serif;font-weight: 600;background: linear-gradient(90deg, black, #353535 50%, #000000 98%);">
          Resume
        </button>
      </div>
    </div>
  </section>
  <section v-if="started == true && !showResults" class="min-vh-100 position-relative">
    <div class="container d-flex flex-column align-items-center min-vh-100">
      <div @click="showResults = true" style="width: 70%;margin-top: 15%;">
        <div class="d-flex justify-content-center align-items-center ratio ratio-1x1"
          :style="`border: 2px solid ${numbers.length < 75 ? 'var(--bs-emphasis-color)' : 'rgb(215 1 9)'};border-radius: 100%;`">
          <div class="ratio ratio-1x1 position-absolute top-50 start-50 translate-middle"
            :style="`width: 94%;height: 94%;
            background: ${numbers.length < 75 ? 'radial-gradient(57.73% 57.73% at 50% 70.1%, #484848 0%, #000000 100%);' : 'radial-gradient(57.73% 57.73% at 50% 70.1%, rgb(61 4 28) 0%, rgb(215 1 9) 100%);'}
            box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.25);
            border-radius: 100%;`">
            
            <p class="d-flex justify-content-center align-items-center"
              style="font-weight: 600;font-size: 20vw;color: var(--bs-body-bg);">
              {{ numbers.length > 0 ? numbers[ numbers.length - 1] : "🐸" }}
            </p>

          </div>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-center w-100 position-relative overflow-hidden" style="max-height: 32vh;">
        
        <template v-for="(number, i) in last5">
          <p v-if="i != 0 && i <= 5" class="text-center" :class="{'mt-2': i == 0, 'mt-1': i > 0}" 
            :style="`font-weight: 600;font-size: ${15 - ((i-1)*2.5)}vw;color: rgba(0,0,0,${1-(i/6)});margin: 0;padding: 0;line-height: 1;`">
            {{number}}
          </p>
        </template>

        <!-- <p class="text-center mt-2"
          style="font-weight: 600;font-size: 15vw;color: #000000;margin: 0;padding: 0;line-height: 1;">75</p>
        <p class="text-center"
          style="font-weight: 600;font-size: 12vw;color: #000000;margin: 0;padding: 0;line-height: 1;">75</p>
        <p class="text-center"
          style="font-weight: 600;font-size: 10vw;color: #000000;margin: 0;padding: 0;line-height: 1;">75</p>
        <p class="text-center"
          style="font-weight: 600;font-size: 7vw;color: #000000;margin: 0;padding: 0;line-height: 1;">75</p>
        <p class="text-center"
          style="font-weight: 600;font-size: 7vw;color: #000000;margin: 0;padding: 0;line-height: 1;">75</p>
        <p class="text-center"
          style="font-weight: 600;font-size: 7vw;color: #000000;margin: 0;padding: 0;line-height: 1;">75</p> -->


        <!-- <div class="position-absolute top-50 start-50 translate-middle"
          style="width: 100%;height: 100%;background: linear-gradient(rgba(255,255,255,0), white 81%);"></div> -->
      </div>
      <button @click="numbers.length < 75 ? getNewNumber() : start()" class="btn btn-primary w-100 py-4" type="button"
        style="border-radius: 25px;font-size: 29px;font-family: Poppins, sans-serif;font-weight: 600;background: linear-gradient(90deg, black, #353535 50%, #000000 98%);margin-top: auto;margin-bottom: 15%;">
        <template v-if="numbers.length >= 75">
          Start Over
        </template>
        <template v-if="numbers.length < 75">
          {{ numbers.length == 0 ? "Start" : "New Number" }}
        </template>
      </button>
    </div>
  </section>
  <section v-if="showResults" class="min-vh-100 position-relative">
    <div class="container d-flex flex-column align-items-center min-vh-100">
      <div class="row mt-4 w-100">
        <div class="col d-flex flex-column justify-content-center">
          <div class="position-relative">
            <div class="ratio ratio-1x1" style="background: var(--bs-secondary-border-subtle);border-radius: 50px;">
            </div>
            <p class="position-absolute top-50 start-50 translate-middle"
              style="font-weight: 600;font-size: 24px;line-height: 1;">B</p>
          </div>

          <template v-for="i in 75">
            <template v-if="i > 75/5*(1-1) && i <= 75/5*1">
              <div @click="toggleNumber(i)" class="position-relative mt-2">
                <template v-if="numbers.includes(i)">
                  <div class="ratio ratio-1x1 m-auto"
                  style="background: var(--bs-emphasis-color);border-radius: 50px;width: 85%;box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);">
                </div>
                <p class="position-absolute top-50 start-50 translate-middle"
                  style="font-weight: 600;font-size: 18px;line-height: 1;color: var(--bs-body-bg);">{{i}}</p>
                </template>

                <template v-if="!numbers.includes(i)">
                  <div class="ratio ratio-1x1 m-auto"
                  style="border-radius: 50px;width: 85%;border: 1px solid rgb(176,176,176) ;"></div>
                <p class="position-absolute top-50 start-50 translate-middle"
                  style="font-weight: 600;font-size: 18px;line-height: 1;">{{ i }}</p>
                </template>
              </div>
            </template>
          </template>

        </div>
        <div class="col">
          <div class="position-relative">
            <div class="ratio ratio-1x1" style="background: var(--bs-secondary-border-subtle);border-radius: 50px;">
            </div>
            <p class="position-absolute top-50 start-50 translate-middle"
              style="font-weight: 600;font-size: 24px;line-height: 1;">I</p>
          </div>

          <template v-for="i in 75">
            <template v-if="i > 75/5*(2-1) && i <= 75/5*2">
              <div @click="toggleNumber(i)" class="position-relative mt-2">
                <template v-if="numbers.includes(i)">
                  <div class="ratio ratio-1x1 m-auto"
                  style="background: var(--bs-emphasis-color);border-radius: 50px;width: 85%;box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);">
                </div>
                <p class="position-absolute top-50 start-50 translate-middle"
                  style="font-weight: 600;font-size: 18px;line-height: 1;color: var(--bs-body-bg);">{{i}}</p>
                </template>

                <template v-if="!numbers.includes(i)">
                  <div class="ratio ratio-1x1 m-auto"
                  style="border-radius: 50px;width: 85%;border: 1px solid rgb(176,176,176) ;"></div>
                <p class="position-absolute top-50 start-50 translate-middle"
                  style="font-weight: 600;font-size: 18px;line-height: 1;">{{ i }}</p>
                </template>
              </div>
            </template>
          </template>

        </div>
        <div class="col">
          <div class="position-relative">
            <div class="ratio ratio-1x1" style="background: var(--bs-secondary-border-subtle);border-radius: 50px;">
            </div>
            <p class="position-absolute top-50 start-50 translate-middle"
              style="font-weight: 600;font-size: 24px;line-height: 1;">N</p>
          </div>

          <template v-for="i in 75">
            <template v-if="i > 75/5*(3-1) && i <= 75/5*3">
              <div @click="toggleNumber(i)" class="position-relative mt-2">
                <template v-if="numbers.includes(i)">
                  <div class="ratio ratio-1x1 m-auto"
                  style="background: var(--bs-emphasis-color);border-radius: 50px;width: 85%;box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);">
                </div>
                <p class="position-absolute top-50 start-50 translate-middle"
                  style="font-weight: 600;font-size: 18px;line-height: 1;color: var(--bs-body-bg);">{{i}}</p>
                </template>

                <template v-if="!numbers.includes(i)">
                  <div class="ratio ratio-1x1 m-auto"
                  style="border-radius: 50px;width: 85%;border: 1px solid rgb(176,176,176) ;"></div>
                <p class="position-absolute top-50 start-50 translate-middle"
                  style="font-weight: 600;font-size: 18px;line-height: 1;">{{ i }}</p>
                </template>
              </div>
            </template>
          </template>

        </div>
        <div class="col">
          <div class="position-relative">
            <div class="ratio ratio-1x1" style="background: var(--bs-secondary-border-subtle);border-radius: 50px;">
            </div>
            <p class="position-absolute top-50 start-50 translate-middle"
              style="font-weight: 600;font-size: 24px;line-height: 1;">G</p>
          </div>

          <template v-for="i in 75">
            <template v-if="i > 75/5*(4-1) && i <= 75/5*4">
              <div @click="toggleNumber(i)" class="position-relative mt-2">
                <template v-if="numbers.includes(i)">
                  <div class="ratio ratio-1x1 m-auto"
                  style="background: var(--bs-emphasis-color);border-radius: 50px;width: 85%;box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);">
                </div>
                <p class="position-absolute top-50 start-50 translate-middle"
                  style="font-weight: 600;font-size: 18px;line-height: 1;color: var(--bs-body-bg);">{{i}}</p>
                </template>

                <template v-if="!numbers.includes(i)">
                  <div class="ratio ratio-1x1 m-auto"
                  style="border-radius: 50px;width: 85%;border: 1px solid rgb(176,176,176) ;"></div>
                <p class="position-absolute top-50 start-50 translate-middle"
                  style="font-weight: 600;font-size: 18px;line-height: 1;">{{ i }}</p>
                </template>
              </div>
            </template>
          </template>

        </div>
        <div class="col">
          <div class="position-relative">
            <div class="ratio ratio-1x1" style="background: var(--bs-secondary-border-subtle);border-radius: 50px;">
            </div>
            <p class="position-absolute top-50 start-50 translate-middle"
              style="font-weight: 600;font-size: 24px;line-height: 1;">O</p>
          </div>

          <template v-for="i in 75">
            <template v-if="i > 75/5*(5-1) && i <= 75/5*5">
              <div @click="toggleNumber(i)" class="position-relative mt-2">
                  <template v-if="numbers.includes(i)">
                    <div class="ratio ratio-1x1 m-auto"
                    style="background: var(--bs-emphasis-color);border-radius: 50px;width: 85%;box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);">
                  </div>
                  <p class="position-absolute top-50 start-50 translate-middle"
                    style="font-weight: 600;font-size: 18px;line-height: 1;color: var(--bs-body-bg);">{{i}}</p>
                  </template>

                  <template v-if="!numbers.includes(i)">
                    <div class="ratio ratio-1x1 m-auto"
                    style="border-radius: 50px;width: 85%;border: 1px solid rgb(176,176,176) ;"></div>
                  <p class="position-absolute top-50 start-50 translate-middle"
                    style="font-weight: 600;font-size: 18px;line-height: 1;">{{ i }}</p>
                  </template>
              </div>
            </template>
          </template>

        </div>
      </div>
      <button @click="showResults = false" class="btn btn-primary w-100 py-4 mt-5" type="button"
        style="border-radius: 25px;font-size: 29px;font-family: Poppins, sans-serif;font-weight: 600;background: linear-gradient(90deg, black, #353535 50%, #000000 98%);margin-top: auto;margin-bottom: 15%;">
        Close
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed, toValue, toRaw } from 'vue';
import localforage from 'localforage';

const started = ref(false);
const showResults = ref(false);
const numbers = ref([]);

function start() {
  numbers.value = [];
  started.value = true;
}

function resume() {
  started.value = true;
}

async function getNewNumber(){
  if (numbers.value.length >= 75) {
    return
  }
  console.log('called');
  let _numbers = JSON.parse(JSON.stringify(numbers.value));
  console.log(_numbers);
  let newNumber = genNewNumber(_numbers, 1, 75);
  numbers.value.push(newNumber);
  store(numbers.value);
  return true
}

function toggleNumber(number) {
  if (numbers.value.includes(number)) {
    numbers.value.splice(numbers.value.indexOf(number), 1); // Remove the number
  } else {
    numbers.value.push(number); // Add the number
  }
  store(numbers.value);
  showResults.value = false;
}

onMounted(async () => {
  try {
    let _numbers = localStorage.getItem('numbers');
    console.log(_numbers);
    _numbers = JSON.parse(_numbers);
    
    if (Array.isArray(_numbers) && _numbers.length > 0 && _numbers.length < 75) {
      numbers.value = _numbers;
    }
  } catch (err) {
      console.log(err);
  }
})

const last5 = computed(()=>{
  return JSON.parse(JSON.stringify(numbers.value)).reverse();
})

function store(numbers){
  try {
    localStorage.setItem('numbers', JSON.stringify(numbers));
  } catch (err) {
      console.log(err);
  }
};

function genNewNumber(array, min, max) {
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (array.includes(randomNumber));

  return randomNumber;
}
</script>

<style scoped>
:root {
  font-family: Poppins, sans-serif;
}
</style>
