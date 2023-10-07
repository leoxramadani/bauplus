import GridLayout from '@/components/molecules/GridLayout/GridLayout';
import React from 'react';
import {
  Payment,
  columns,
} from '@/components/molecules/table/columns/columns';

const Dashboard = () => {
  return (
    <GridLayout data={["1", "2", "3"]}   />
  )
};

export default Dashboard;

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: '264d5734-66fc-445d-ad5c-2e89c784327a',
      amount: 99,
      status: 'success',
      email: 'gcrinion0@de.vu',
    },
    {
      id: '0efa920e-3da9-4f32-aa76-130328e3b02d',
      amount: 244,
      status: 'processing',
      email: 'fbogeys1@princeton.edu',
    },
    {
      id: '8f36a8b8-fcdd-474a-a361-8cf4e090b9fa',
      amount: 162,
      status: 'pending',
      email: 'gabbiss2@altervista.org',
    },
    {
      id: '0301d3fe-fece-48af-a477-48872658e0b6',
      amount: 195,
      status: 'failed',
      email: 'cmant3@amazon.de',
    },
    {
      id: 'cc78c1b8-b1b4-4454-871b-982ce9d9022e',
      amount: 717,
      status: 'processing',
      email: 'ggewer4@mediafire.com',
    },
    {
      id: '65f4c562-11d1-40c8-8c01-57a70646aa11',
      amount: 776,
      status: 'processing',
      email: 'mmccleod5@unesco.org',
    },
    {
      id: '0e618f35-d38f-40c3-ad9d-5dd422011091',
      amount: 443,
      status: 'success',
      email: 'bmillership6@lulu.com',
    },
    {
      id: '1cc928db-9611-416d-b16a-a5e9c8df3293',
      amount: 341,
      status: 'success',
      email: 'mhatto7@tinypic.com',
    },
    {
      id: '802ea87e-97a5-4c37-9e4e-863494b1e630',
      amount: 821,
      status: 'failed',
      email: 'svenour8@meetup.com',
    },
    {
      id: '1df41952-6760-433b-a3b9-8559805a72d9',
      amount: 953,
      status: 'pending',
      email: 'wneles9@howstuffworks.com',
    },
    {
      id: 'd1c51d64-e80d-4016-ae97-84f9279c4f00',
      amount: 121,
      status: 'failed',
      email: 'kstauntona@mozilla.org',
    },
    {
      id: '60338eb2-98c9-49b8-bdc3-f9b3304e7ac6',
      amount: 946,
      status: 'failed',
      email: 'ltapendenb@about.com',
    },
    {
      id: 'f756208c-2957-4cd3-a57b-4f6b5e6ad2d7',
      amount: 804,
      status: 'processing',
      email: 'fkillcrossc@uiuc.edu',
    },
    {
      id: 'd85bfa17-c9c9-41af-9dab-4c38b72888c2',
      amount: 171,
      status: 'processing',
      email: 'okaretd@wiley.com',
    },
    {
      id: 'db6d4507-211e-4c7d-9662-67be9259f262',
      amount: 63,
      status: 'success',
      email: 'cfriere@google.pl',
    },
    {
      id: 'faf5d4b3-603a-4bd1-ad25-3a12b9e1a26d',
      amount: 987,
      status: 'success',
      email: 'awestmacottf@adobe.com',
    },
    {
      id: '7cb80109-62d1-4243-adb7-8c72afa9ea56',
      amount: 302,
      status: 'failed',
      email: 'sguestg@mysql.com',
    },
    {
      id: 'd9491f46-bc0e-48dc-a71e-8d1f4b1cc0a9',
      amount: 437,
      status: 'success',
      email: 'oravenshearh@pen.io',
    },
    {
      id: 'e647a28e-5a87-4d1a-b99f-61831c278590',
      amount: 106,
      status: 'success',
      email: 'kpryni@drupal.org',
    },
    {
      id: 'fdf50dde-e94b-4627-95a7-f3bb9f61fb61',
      amount: 693,
      status: 'failed',
      email: 'bsultanaj@theguardian.com',
    },
    {
      id: 'd201f936-a176-4862-9d4a-5696b7e09f3a',
      amount: 416,
      status: 'failed',
      email: 'vharphamk@blogger.com',
    },
    {
      id: 'a272f642-2929-4ca3-8f1e-275430e624ce',
      amount: 401,
      status: 'success',
      email: 'chamshawl@icio.us',
    },
    {
      id: '29707c95-3cc2-45ae-ae2f-e1efa4ea60fa',
      amount: 639,
      status: 'processing',
      email: 'cghelardonim@trellian.com',
    },
    {
      id: '7eac3d75-5eef-40a7-a528-a0cdd1a0580e',
      amount: 179,
      status: 'success',
      email: 'mdelahayen@skype.com',
    },
    {
      id: '115a6eb4-138a-4ac9-b707-9b55520191c9',
      amount: 360,
      status: 'failed',
      email: 'wmattheuso@nhs.uk',
    },
    {
      id: '5dceaeb2-740f-415c-9b57-f6e9f6000502',
      amount: 211,
      status: 'processing',
      email: 'ccrucittip@apache.org',
    },
    {
      id: '68678b4c-ea3f-42c3-98f8-1ca22a5d476e',
      amount: 979,
      status: 'processing',
      email: 'rcalafateq@army.mil',
    },
    {
      id: 'eb641544-c744-4aeb-9736-fcb8ad7dcaaf',
      amount: 482,
      status: 'pending',
      email: 'avuittetr@jigsy.com',
    },
    {
      id: 'b866c454-b6cd-4b74-9519-d5ea8fe53ad2',
      amount: 709,
      status: 'pending',
      email: 'fsercks@blogtalkradio.com',
    },
    {
      id: 'e389be1c-2c78-41ad-8e56-a1a61f8429a9',
      amount: 679,
      status: 'success',
      email: 'tayrist@gravatar.com',
    },
    {
      id: 'e0869d78-e074-4b7e-920a-a47e64a59c71',
      amount: 249,
      status: 'success',
      email: 'awilmutu@yellowbook.com',
    },
    {
      id: '03d9fac0-7077-4e62-a3d2-0a0a5b79114b',
      amount: 915,
      status: 'failed',
      email: 'eorvisv@sitemeter.com',
    },
    {
      id: '00fc478e-7125-4628-a6ea-aa1251eedd25',
      amount: 998,
      status: 'failed',
      email: 'vdehoochw@wikia.com',
    },
    {
      id: 'ca3c50b4-b456-4a69-a9ec-73b63863f793',
      amount: 513,
      status: 'pending',
      email: 'dbielefeldx@ftc.gov',
    },
    {
      id: 'ce4218e4-ce4d-493b-b2eb-b42d10232990',
      amount: 490,
      status: 'success',
      email: 'tgonety@freewebs.com',
    },
    {
      id: 'e82c7b77-05f5-4b3c-b043-e4ff1f1400b1',
      amount: 391,
      status: 'processing',
      email: 'ggoodsellz@4shared.com',
    },
    {
      id: '6d148c4a-d5a0-4db6-b296-ebba18c4fdfd',
      amount: 668,
      status: 'failed',
      email: 'abatrip10@wired.com',
    },
    {
      id: 'fccc93ff-bfb4-429f-9102-65e859eac798',
      amount: 986,
      status: 'failed',
      email: 'hhaugeh11@geocities.com',
    },
    {
      id: 'a6851409-2de9-4f00-8899-d3e5018a5dbc',
      amount: 352,
      status: 'success',
      email: 'ebutterly12@dailymail.co.uk',
    },
    {
      id: 'bcd11a75-3e6a-459a-a80a-320ed21d8cae',
      amount: 67,
      status: 'success',
      email: 'ceasen13@123-reg.co.uk',
    },
    {
      id: 'f72c19b4-cb32-400b-9b00-cdc90591c238',
      amount: 262,
      status: 'processing',
      email: 'jvillaret14@stumbleupon.com',
    },
    {
      id: '985ea53c-fec3-418c-97b3-3825887115d7',
      amount: 612,
      status: 'processing',
      email: 'rgarretts15@woothemes.com',
    },
    {
      id: '5481aa65-5502-4b19-9daa-eb27e19857fa',
      amount: 497,
      status: 'success',
      email: 'jpanichelli16@bandcamp.com',
    },
    {
      id: '26bc5a7e-4ff6-4af5-8fd3-01ae5ee8c1d4',
      amount: 774,
      status: 'success',
      email: 'tbrodeau17@nbcnews.com',
    },
    {
      id: '987cad39-0489-4cb6-877c-0ccb3901721f',
      amount: 42,
      status: 'processing',
      email: 'aruck18@vimeo.com',
    },
    {
      id: '34bc1aa5-efb9-48b9-bd29-d7cacde5bf87',
      amount: 533,
      status: 'pending',
      email: 'nkienlein19@google.ca',
    },
    {
      id: '83901e40-be61-494d-b6aa-758498d3fedf',
      amount: 291,
      status: 'processing',
      email: 'igoard1a@biglobe.ne.jp',
    },
    {
      id: '52cd7491-2300-4e11-80a1-05391ff8a928',
      amount: 278,
      status: 'processing',
      email: 'cteece1b@php.net',
    },
    {
      id: 'c483623d-403a-49a6-8620-7e3b3f86c941',
      amount: 166,
      status: 'processing',
      email: 'tgorler1c@shop-pro.jp',
    },
    {
      id: '2a065dd9-2d82-41ab-9971-c536b1af4247',
      amount: 183,
      status: 'processing',
      email: 'obartolomeotti1d@ed.gov',
    },
  ];
}
