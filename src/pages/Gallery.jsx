import { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const PHOTOS = [
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/825b35dba_hanna-bezsonova-YThvORZGyaU-unsplash.jpg', alt: 'Sveti Stefan at sunset', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/6884dd21b_anastasiia-malai-vxzJBvWcunU-unsplash.jpg', alt: 'Kotor Bay aerial', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/4b9c461a7_kenneth-sonntag-_fnQwAsQ28A-unsplash.jpg', alt: 'Prokletije mountain meadow', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/423ad25ba_adventure-albania-B2s-_MbHWf8-unsplash.jpg', alt: 'Hiking group on summit', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/b063d61e1_laurynas-zizys-1DLriK6ghy8-unsplash.jpg', alt: 'Skadar Lake panorama', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/62be0a92d_maria-ivanova-uf_VKwoqAJQ-unsplash.jpg', alt: 'Adriatic clear water', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/61df8e3be_petar-lazarevic-J6Ij4p87lD8-unsplash1.jpg', alt: 'Bay of Kotor, Perast', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/af482e0e3_adventure-albania-XX1h3Zk0wPA-unsplash.jpg', alt: 'Solo hiker mountain valley', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/5843b046b_rasmus-andersen-b_1IEUOKwnQ-unsplash.jpg', alt: 'Woman in red jacket, mountains', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/9c815610c_laurynas-zizys-lZ7ra80csh4-unsplash.jpg', alt: 'Skadar Lake aerial', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/a6d111ced_laurynas-zizys-zuCODqU384U-unsplash.jpg', alt: 'Skadar lake lily pads', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ea44d4c38_laurynas-zizys-3NjibGzTAEk-unsplash.jpg', alt: 'Boat on Skadar lake', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/e36fe30df_laurynas-zizys-zFb4eDiRrRw-unsplash.jpg', alt: 'River boat, Skadar', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/2902e0699_laurynas-zizys-wuagk_3Vz2U-unsplash.jpg', alt: 'Skadar Lake aerial blue', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/7c52b25de_laurynas-zizys-h79e537FyFE-unsplash.jpg', alt: 'Skadar lake panoramic', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/a85550ed9_laurynas-zizys-u4lG9WByXdQ-unsplash.jpg', alt: 'Skadar river aerial', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/e3d535397_laurynas-zizys-s_U8vXerz-I-unsplash.jpg', alt: 'Skadar river', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/a224603db_laurynas-zizys-SYfczsvojc0-unsplash.jpg', alt: 'Skadar from above', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/0ef631d34_alexey-malakhov-BEkKjGPmhrU-unsplash.jpg', alt: 'Kotor Bay wide view', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/a11b66f52_damien-checoury-ZhGbAXHq38A-unsplash.jpg', alt: 'Tara Canyon road', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1772e29aa_jinhui-chen-u1qsVkb8Lb8-unsplash.jpg', alt: 'Local café, old town', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/bd67a9bac_anastasia-kushnir-AwUp9muAhys-unsplash.jpg', alt: 'Couple, Kotor overlook', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/e3d1d4151_anton-matis-btrBrLNldMk-unsplash.jpg', alt: 'Perast, Bay of Kotor', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/da4519d8d_anton-matis-TcznYpSDtX0-unsplash.jpg', alt: 'Kotor at night', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/07dabb4bc_petar-lazarevic-J6Ij4p87lD8-unsplash.jpg', alt: 'Bay of Kotor', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/d069ab82a_anna-sullivan-WRM2pmEj_oM-unsplash.jpg', alt: 'Skadar Lake with mountains', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/e13cde9a3_bozidar-vukadinovic-XWgShk3aqQo-unsplash.jpg', alt: 'Skadar moody morning', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/6a244edc1_gleb-lucky-6ZR9AIzOOQE-unsplash.jpg', alt: 'Skadar river bend', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/8c0ee41bb_boris-raicevic-OKkdCQmdrt8-unsplash.jpg', alt: 'Kotor bay reflection', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/92472d300_vladimir-kojovic-FQTovE8e3I4-unsplash.jpg', alt: 'Kotor from above', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/86a85bc74_mujo-hasanovic-UMOF9F9nyuE-unsplash.jpg', alt: 'Kotor village', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/f9d8c51ee_daniil-korbut-rVBQbcgEcYE-unsplash.jpg', alt: 'Tara river bridge aerial', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/4578271e0_miljan-mijatovic-pv5TrTK7OJw-unsplash.jpg', alt: 'Durmitor mountains', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/b880878db_miljan-mijatovic-pdzUMbM8dZI-unsplash.jpg', alt: 'Black Lake, Durmitor', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/9f7c354b9_nenad-radojcic-E1k4pdXHO18-unsplash.jpg', alt: 'Black Lake morning', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/a54524b1e_tijana-drndarski-zAwoV2oIzgE-unsplash.jpg', alt: 'Sveti Stefan beach', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/81c4d264a_christopher-alvarenga-W2HqRXNgO6k-unsplash.jpg', alt: 'Budva old town waves', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/e85b22f7b_chitra-laras-VMTAtRUwgVA-unsplash.jpg', alt: 'Kotor fortress wall', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/cfaa0e8f8_antonio-janeski-E653rfV25ds-unsplash.jpg', alt: 'Sveti Stefan island', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/32709bb9e_vadym-merzlikin-SZl8ats2vSw-unsplash.jpg', alt: 'Sveti Stefan beach view', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/6219ae330_radik-sitdikov-ZEtzG5wmfs8-unsplash.jpg', alt: 'Sveti Stefan sunset golden', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/7cf4823af_alexandr-bormotin-8KSc_ZE7vvk-unsplash.jpg', alt: 'Kotor old town arch', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/7b342ada7_starosta-SUjnFMdjdKw-unsplash.jpg', alt: 'Kotor old town square', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/9ebed4f04_ivana-djudic-7LZ8zIcdxD4-unsplash.jpg', alt: 'Kotor shop cat', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/077abdfc4_oskar-hagberg-gBg8N-cSIFM-unsplash.jpg', alt: 'Kotor fortress aerial', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/34c97e92a_luka-zaric--MrJSc9PdTw-unsplash.jpg', alt: 'Kotor at dawn', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/8b51bbee7_george-kedenburg-iii-sW04kksN0_s-unsplash.jpg', alt: 'Kotor from the fortress', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c05fd0145_djordje-djordjevic-3ApuxxW0N38-unsplash.jpg', alt: 'Kotor Bay aerial blue', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/e7669dec9_secret-travel-guide-8Dk-eY8RSFU-unsplash.jpg', alt: 'Kotor old town street', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/4c9aea4fe_oleg-gratilo-sDR2I4sZajE-unsplash.jpg', alt: 'Kotor Bay', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c70cbef33_hanna-bezsonova-7iFI7npejpo-unsplash.jpg', alt: 'Budva old town', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/6ebc8a8f2_dean-milenkovic-W1YyR-a7qOo-unsplash.jpg', alt: 'Montenegro coast', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/9281bccc8_mujo-hasanovic-oS86A3YR7Qs-unsplash.jpg', alt: 'Kotor aerial village', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ae7757532_illia-panasenko-vktU9VU_CYk-unsplash.jpg', alt: 'Kotor Bay coastline', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1a7de1153_radik-sitdikov-tGKSWRROTLg-unsplash.jpg', alt: 'Sveti Stefan beach morning', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/7694498f7_evgeny-matveev-OLIWED92XNs-unsplash.jpg', alt: 'Tara River gorge', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1dae94e41_faruk-kaymak-b_e5K7B3MzQ-unsplash.jpg', alt: 'Tara canyon bridge', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/607ec0819_olga-brajnovic-_nupO8tu6sg-unsplash.jpg', alt: 'Tara river valley', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/3c4363568_miljan-mijatovic-DttxSattuKM-unsplash.jpg', alt: 'Tara bridge autumn', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/07839e2f2_dragisa-braunovic-vAiCza4PuGk-unsplash.jpg', alt: 'Montenegro canyon road', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ed55abccf_oleg-gratilo-XI0z-tZQNWA-unsplash.jpg', alt: 'Canyon road through rock', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/b44bc930f_radik-sitdikov-F6PU4WBO8As-unsplash.jpg', alt: 'Kotor winding road', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/6c074e893_petar-lazarevic-Oz_hSMW1bmM-unsplash.jpg', alt: 'Tara canyon aerial', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/4f146b89f_dragisa-braunovic-Bsq_3jwAki8-unsplash.jpg', alt: 'Mountain valley hike', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/d49bcb73b_alexander-pcfe_3aptdg-unsplash.jpg', alt: 'Mountain ridge trail', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/cea12ea78_alexander-fSvC516w_eI-unsplash.jpg', alt: 'Mountain trail panorama', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/9595a95ea_alexander-oqeTSYqE6WI-unsplash.jpg', alt: 'Prokletije mountain peak', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ea921d13f_alexander-4b_2ZFwXX74-unsplash.jpg', alt: 'Prokletije ridge view', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/74af9ac85_alexander-Pv1NpUKVUGQ-unsplash.jpg', alt: 'Mountain trail hiker', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/baa275c25_dasha-kanevskaya-8Eu9uruNRX8-unsplash.jpg', alt: 'Mountain village view', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/48cd949ef_laurynas-zizys-_Eq7dMeZeUE-unsplash.jpg', alt: 'Skadar lake overview', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/698b64b67_sheila-c-RRs13LHyVGI-unsplash.jpg', alt: 'Lake with wildflowers', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1881f49ce_anna-keibalo-FJbqANO2cMA-unsplash.jpg', alt: 'Prokletije camp meadow golden', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/af2dfd928_maria-ivanova-_cKfytWdZJo-unsplash.jpg', alt: 'Mountain landscape', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ee101b898_viktoriia-kondratiuk-euRs77MlnrI-unsplash.jpg', alt: 'Montenegro flag Kotor', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/19782ac4b_viktoriia-kondratiuk-Q3Q_RKqRMow-unsplash.jpg', alt: 'Montenegro flag Bay of Kotor', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/2454cad29_benjamin-nilsen-HlVQ90oHQpY-unsplash.jpg', alt: 'Sveti Stefan aerial', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/a9a0fdaeb_maxim-berg-m-c10j7r910-unsplash.jpg', alt: 'Sveti Stefan bird eye', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/be2bb49c2_iryna-marienko-CmDy57rcGy4-unsplash.jpg', alt: 'Sveti Stefan warm sunset', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/b200a6f7e_oleksandr-IXiFL_4ZK20-unsplash.jpg', alt: 'Sveti Stefan blue sky', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ede2f28c8_irina-ideas-hEJ7MzOLhM8-unsplash.jpg', alt: 'Skadar lake blue panorama', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/83507d9f3_jinhui-chen-OU3uNN8PFTk-unsplash.jpg', alt: 'Café old town outdoor', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/86173fae2_danilo-obradovic-DVDHf2wTnEw-unsplash.jpg', alt: 'Podgorica bridge night', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/476b507c9_alexandr-voronsky-NYGy4sHuYbo-unsplash.jpg', alt: 'Podgorica bridge day', category: 'Culture' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/da00c1878_oleg-gratilo-GnNfZxvocIE-unsplash.jpg', alt: 'Mountain river pool', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/83144fcfd_alex-sherstnev-h22OJ8Whpv4-unsplash.jpg', alt: 'Adriatic clear water', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/3a8bb71f8_ivan-aleksic-5pIP1uuiL34-unsplash.jpg', alt: 'Mountain landscape valley', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/3e0b73677_anastasiya-d-WQVOa8MnrUY-unsplash.jpg', alt: 'Skadar Lake', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/23a432832_orkhan-farmanli-pfA49axBEVY-unsplash.jpg', alt: 'Skadar lake blue islands', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/cde5b0108_anastasiya-d-hjuUedE_lSo-unsplash.jpg', alt: 'Skadar', category: 'Lakes' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/6685db7ee_pauline-heidmets-NdGHWb0i_1w-unsplash.jpg', alt: 'Mountain valley lush', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/55544bf17_lieana-slapinsh-ntTxAoG06tI-unsplash.jpg', alt: 'Mountain road aerial', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/9031ac2ba_miljan-mijatovic-KYbDibssjXg-unsplash.jpg', alt: 'Durmitor range', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/5dbac0731_alexander-nRuPY_8fvrU-unsplash.jpg', alt: 'Mountain rocky peak', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ce0a73382_shant-dem-24gpYnCoUpk-unsplash1.jpg', alt: 'Prokletije sunrise', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1029a8bfc_uliana-sova--yuFfvEhmFs-unsplash.jpg', alt: 'Woman on mountain', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/00907a14b_defne-kucukmustafa-nud2Qpfo6lM-unsplash.jpg', alt: 'Budva old town from water', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/02ca64e7a_anastasiia-malai-AUaEboiEbuM-unsplash.jpg', alt: 'Woman Budva coast', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/001584b88_gamze-teoman-wjKeUb-oguw-unsplash.jpg', alt: 'Woman Budva church', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/a55a31293_polina-rytova-1AUe0hwdC3o-unsplash.jpg', alt: 'Budva old town', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/465687edf_joachim-lesne-VvIRsP2AD5I-unsplash.jpg', alt: 'Bay of Kotor view', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/6c601feac_til-man-yab_1LTXUMs-unsplash.jpg', alt: 'Mountain cliffs', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/5b882af53_daniel-tonks-KiMyV_nQQJI-unsplash.jpg', alt: 'Mountain forest', category: 'Mountains' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/cbafe2bee_alex-chernenko-CJpnV8JjqvY-unsplash.jpg', alt: 'Durmitor mountain road', category: 'Adventure' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/7b41f6047_linda-gerbec-85x7XREre_w-unsplash.jpg', alt: 'Budva island from water', category: 'Coast' },
  { src: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/38de56312_viacheslav-volodin-8YIy9FB36_w-unsplash.jpg', alt: 'Prokletije valley wide', category: 'Mountains' },
];

const CATEGORIES = ['All', 'Coast', 'Mountains', 'Lakes', 'Adventure', 'Culture'];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? PHOTOS : PHOTOS.filter(p => p.category === active);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-28 px-6 text-center border-b border-border">
        <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Real Montenegro</p>
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 leading-tight">Photo Gallery</h1>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
          Real places, real landscapes. Everything you'll experience on the trip.
        </p>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto flex-shrink-0 text-xs text-muted-foreground">{filtered.length} photos</span>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((photo, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in group"
              onClick={() => setLightbox(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center border-t border-border">
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">Ready to see this for yourself?</p>
        <Link
          to="/book"
          className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-110 transition-all shadow-xl"
        >
          Start Planning
        </Link>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">{lightbox.alt}</p>
        </div>
      )}

      <div className="md:hidden h-20" />
    </div>
  );
}