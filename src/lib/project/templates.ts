import type { SavedPage, Project } from ".";
import { fromSegmentTempalte } from "../nodes/segment";
import type { ItemData } from "../nodes/item";

const emptyItemData = {
  name: "",
  description: "",
  showText: false,
  showTitle: false,
  textHeight: 40,
  textWidth: 120,
} as const satisfies Partial<ItemData>;

export const pageTemplates = {
  empty: fromSegmentTempalte("empty", {
    name: "Page 1",
  }),
  default: fromSegmentTempalte("default", {
    name: "Page 1",
    nodes: [
      {
        id: "1",
        type: "item",
        data: {
          ...emptyItemData,
          name: "steam",
          icon: {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
            shape: "circle",
          },
        },
        position: { x: 90, y: 80 },
        parentNode: "key-partners",
        extent: "parent",
      },
      {
        id: "2",
        type: "item",
        data: {
          ...emptyItemData,
          name: "empty test",
          icon: {},
        },
        position: { x: 30, y: 100 },
        parentNode: "key-activities",
        extent: "parent",
      },
      {
        id: "3",
        type: "item",
        data: {
          ...emptyItemData,
          name: "empty test",
          icon: {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
          },
        },
        position: { x: 120, y: 50 },
        parentNode: "channels",
        extent: "parent",
      },
      {
        id: "4",
        type: "item",
        data: {
          ...emptyItemData,
          name: "Costs",
          icon: {
            src: "https://static.vecteezy.com/system/resources/previews/019/006/277/original/money-cash-icon-png.png",
            shape: "circle",
            background: "light",
          },
        },
        position: { x: 320, y: 120 },
        parentNode: "costs",
        extent: "parent",
      },
    ],
    edges: [
      {
        id: "1-2-test",
        source: "1",
        target: "2",
      },
      {
        id: "2-3-test",
        source: "2",
        target: "3",
      },
      {
        id: "1-4-test",
        source: "1",
        target: "4",
      },
    ],
  }),
  detailed_empty: fromSegmentTempalte("detailed", {
    name: "Page 1",
  }),
  example1: fromSegmentTempalte("detailed", {
    name: "Page 1",
    grid: {
      columns: [200, 224, 200, 200, 200, 200],
      rows: [200, 210, 210, 210, 200],
    },
    nodes: [
      {
        type: "item",
        id: "5421c8f9-6181-4230-a702-2a44ce7c1e66",
        position: { x: 44, y: 46 },
        data: {
          ...emptyItemData,
          name: "Sociala Medier",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=13963",
          },
          description:
            "Facebook, twitter, instagram, threads, tiktok, snapchat",
        },
        extent: "parent",
        parentNode: "marketing",
      },
      {
        type: "item",
        id: "a816ea5f-0fd0-495c-b432-9f571ab126f5",
        position: { x: 99, y: 46 },
        data: {
          ...emptyItemData,
          name: "YouTube",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=108794",
          },
        },
        extent: "parent",
        parentNode: "marketing",
      },
      {
        type: "item",
        id: "faddacb6-4077-4f67-a1ef-8c28dea25595",
        position: { x: 150, y: 44 },
        data: {
          ...emptyItemData,
          name: "Podcast",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=12380",
          },
        },
        extent: "parent",
        parentNode: "marketing",
      },
      {
        type: "item",
        id: "10aa18b7-8439-4590-8add-dc0ee4f784a9",
        position: { x: 201, y: 44 },
        data: {
          ...emptyItemData,
          name: "Influencer",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=nrEFWOZ9YrxK",
          },
        },
        extent: "parent",
        parentNode: "marketing",
      },
      {
        type: "item",
        id: "26d2420d-1715-4b98-a25c-f3710f3611aa",
        position: { x: 266, y: 43 },
        data: {
          ...emptyItemData,
          name: "Reddit",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=13642",
          },
        },
        extent: "parent",
        parentNode: "marketing",
      },
      {
        type: "item",
        id: "2c0a0d47-0795-403b-9e7e-280bcef14cc3",
        position: { x: 16, y: 45 },
        data: {
          ...emptyItemData,
          name: "Personal Support",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=11947",
          },
        },
        extent: "parent",
        parentNode: "customer-relations",
      },
      {
        type: "item",
        id: "b9d03733-2dfb-4196-8133-9be27d452602",
        position: { x: 68, y: 39 },
        data: {
          ...emptyItemData,
          name: "Ai Support",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=13631",
          },
        },
        extent: "parent",
        parentNode: "customer-relations",
      },
      {
        type: "item",
        id: "773de772-b93d-4170-9f14-5438fea51c98",
        position: { x: 119, y: 38 },
        data: {
          ...emptyItemData,
          name: "Self Service",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=fGknlRQpuSVb",
          },
        },
        extent: "parent",
        parentNode: "customer-relations",
      },
      {
        type: "item",
        id: "84667731-2c1e-4d4f-8f2b-b602682a6a60",
        position: { x: 172, y: 48 },
        data: {
          ...emptyItemData,
          name: "Community Driven",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=122811",
          },
        },
        extent: "parent",
        parentNode: "customer-relations",
      },
      {
        type: "item",
        id: "54dd529b-e332-44f8-a646-35b410a02871",
        position: { x: 242, y: 42 },
        data: {
          ...emptyItemData,
          name: "Co-Creation (Modding)",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=Pj0ay2nNKIhI",
          },
        },
        extent: "parent",
        parentNode: "customer-relations",
      },
      {
        type: "item",
        id: "651c5357-6880-4129-9793-b6b308187df8",
        position: { x: 23, y: 39 },
        data: {
          ...emptyItemData,
          name: "Steam",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=ImwGPKqJwA2U",
          },
        },
        extent: "parent",
        parentNode: "distribution",
      },
      {
        type: "item",
        id: "cc09e4f8-4274-486d-9073-1519018eaf57",
        position: { x: 81, y: 38 },
        data: {
          ...emptyItemData,
          name: "Game Distributors",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=68104",
          },
          description: "GOG\nHumble Store\nGreen Man Gaming\nNuuvem",
        },
        extent: "parent",
        parentNode: "distribution",
      },
      {
        type: "item",
        id: "33671027-e55b-40a1-a449-eab60267e6c6",
        position: { x: 144, y: 32 },
        data: {
          ...emptyItemData,
          name: "Epic Games",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=gItgZriuEvjv",
          },
        },
        extent: "parent",
        parentNode: "distribution",
      },
      {
        type: "item",
        id: "adbbda78-b18d-415c-aba5-49f3715021ba",
        position: { x: 192, y: 30 },
        data: {
          ...emptyItemData,
          name: "PlayStation",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=13629",
          },
        },
        extent: "parent",
        parentNode: "distribution",
      },
      {
        type: "item",
        id: "8ef84b2b-45ef-409c-b745-cb361458e515",
        position: { x: 265, y: 43 },
        data: {
          ...emptyItemData,
          name: "Xbox",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=63696",
          },
        },
        extent: "parent",
        parentNode: "distribution",
      },
      {
        type: "item",
        id: "f7fa5629-9f52-4234-8835-83c069d648c2",
        position: { x: 30, y: 108 },
        data: {
          ...emptyItemData,
          name: "Windows Store",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=108792",
          },
        },
        extent: "parent",
        parentNode: "distribution",
      },
      {
        type: "item",
        id: "0fe14b90-abd7-4c6d-b4a5-89ed851f4b8e",
        position: { x: 89, y: 106 },
        data: {
          ...emptyItemData,
          name: "App Stores",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=63788",
          },
        },
        extent: "parent",
        parentNode: "distribution",
      },
      {
        type: "item",
        id: "e7596d97-3301-4994-a677-b7dce2fd4fa2",
        position: { x: 158, y: 113 },
        data: {
          ...emptyItemData,
          name: "Nintendo",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=19598",
          },
        },
        extent: "parent",
        parentNode: "distribution",
      },
      {
        type: "item",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        position: { x: 21, y: 36 },
        data: {
          ...emptyItemData,
          name: "Publisher",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=4QcyAmItf6M0",
          },
        },
        extent: "parent",
        parentNode: "key-support",
      },
      {
        type: "item",
        id: "28ba27e0-1b2e-42b0-abfe-0fcd636fb22d",
        position: { x: 16, y: 98 },
        data: {
          ...emptyItemData,
          name: "Investor",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=19844",
          },
        },
        extent: "parent",
        parentNode: "key-support",
      },
      {
        type: "item",
        id: "b9ec921c-845f-4fdb-9952-b43ddff808bc",
        position: { x: 12, y: 157 },
        data: {
          ...emptyItemData,
          name: "Marketing Partner",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=12381",
          },
        },
        extent: "parent",
        parentNode: "key-support",
      },
      {
        type: "item",
        id: "eb3efd8b-c4e8-4344-9cd3-24293be75d8e",
        position: { x: 11, y: 244 },
        data: {
          ...emptyItemData,
          name: "Service Provider",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=103938",
          },
        },
        extent: "parent",
        parentNode: "key-support",
      },
      {
        type: "item",
        id: "960013d8-874c-4c10-a462-d06e3bd513b2",
        position: { x: 30, y: 450 },
        data: {
          ...emptyItemData,
          name: "Hardware",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=18749",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "item",
        id: "86634535-7633-4f90-af9f-777cd8eeb84b",
        position: { x: 110, y: 450 },
        data: {
          ...emptyItemData,
          name: "Software",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=12929",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "item",
        id: "3697fd6a-b8a6-48b4-98ce-7d1e6fa99585",
        position: { x: 17, y: 132 },
        data: {
          ...emptyItemData,
          name: "Devkit",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=19294",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "item",
        id: "124db701-c837-41d5-bfde-b49421adbcdd",
        position: { x: 91, y: 168 },
        data: {
          ...emptyItemData,
          name: "Proprietary Tech",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=12784",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "item",
        id: "d82960fc-4109-4e1b-b28d-beb7a86d1c10",
        position: { x: 14, y: 197 },
        data: {
          ...emptyItemData,
          name: "Intellectual Assets",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=104078",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "item",
        id: "82e42362-e11f-49b7-ba3b-61042a5cefff",
        position: { x: 111, y: 213 },
        data: {
          ...emptyItemData,
          name: "Office Space",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=104227",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "item",
        id: "15fd643e-16ee-4510-b002-71670f69cb9b",
        position: { x: 14, y: 292 },
        data: {
          ...emptyItemData,
          name: "Customer Register",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=13139",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "item",
        id: "8162ce54-f6a7-43b9-8f6d-f1d625a25779",
        position: { x: 120, y: 287 },
        data: {
          ...emptyItemData,
          name: "Funds",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=34060",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "item",
        id: "54a02463-a45c-4a11-a126-56d3a528634a",
        position: { x: 27, y: 365 },
        data: {
          ...emptyItemData,
          name: "Agreements",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=108783",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "item",
        id: "ed8bf0f2-7c3a-49ff-b47b-5f2c95e23b95",
        position: { x: 130, y: 373 },
        data: {
          ...emptyItemData,
          name: "Know-How",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=qiruWgTuD5o8",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "item",
        id: "8f95c875-8544-4585-9046-db9585ca3402",
        position: { x: 33, y: 65 },
        data: {
          ...emptyItemData,
          name: "Development",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=SBEjRDmczSCC",
          },
          description:
            "Product Management\nProgramming\nArt\nAudio\nDesign/Writing",
        },
        extent: "parent",
        parentNode: "key-activities",
      },
      {
        type: "item",
        id: "a941bfc3-6bf6-4ce1-8b8f-0f5d4b5322b7",
        position: { x: 31, y: 122 },
        data: {
          ...emptyItemData,
          name: "QA",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=23315",
          },
        },
        extent: "parent",
        parentNode: "key-activities",
      },
      {
        type: "item",
        id: "aa1bc14b-a1a7-4c42-b36a-f97e3f489517",
        position: { x: 28, y: 183 },
        data: {
          ...emptyItemData,
          name: "Localisation",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=31016",
          },
        },
        extent: "parent",
        parentNode: "key-activities",
      },
      {
        type: "item",
        id: "7c6d9e97-ffab-4b7a-883e-90b4a7b6743e",
        position: { x: 109, y: 61 },
        data: {
          ...emptyItemData,
          name: "Porting",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=70714",
          },
        },
        extent: "parent",
        parentNode: "key-activities",
      },
      {
        type: "item",
        id: "656fabf1-46bd-4592-ae04-576030fed217",
        position: { x: 135, y: 303 },
        data: {
          ...emptyItemData,
          name: "Marketing",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=xOxAdcl6DVo2",
          },
        },
        extent: "parent",
        parentNode: "key-activities",
      },
      {
        type: "item",
        id: "10453db4-cbb3-4c22-bee2-793d10ed6d3b",
        position: { x: 123, y: 189 },
        data: {
          ...emptyItemData,
          name: "Community Management",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=14804",
          },
        },
        extent: "parent",
        parentNode: "key-activities",
      },
      {
        type: "item",
        id: "5e859660-508c-410d-be53-0e5047739895",
        position: { x: 32, y: 263 },
        data: {
          ...emptyItemData,
          name: "Business Development",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=103932",
          },
        },
        extent: "parent",
        parentNode: "key-activities",
      },
      {
        type: "item",
        id: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b",
        position: { x: 141, y: 115 },
        data: {
          ...emptyItemData,
          name: "Employees",
          icon: {
            src: "https://img.icons8.com/?size=100&format=png&id=108334",
          },
        },
        extent: "parent",
        parentNode: "key-resources",
      },
      {
        type: "slider",
        id: "5a48fb87-551d-4117-bab2-f0be28a43564",
        position: {
          x: 23,
          y: 39,
        },
        data: {
          value: [50],
        },
        extent: "parent",
        parentNode: "users",
      },
      {
        type: "slider",
        id: "a9ae9e7b-871d-4674-bc37-eb3e9f22eac0",
        position: {
          x: 25,
          y: 55,
        },
        data: {
          value: [50],
        },
        extent: "parent",
        parentNode: "key-resources",
      },
    ],
    edges: [
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-5421c8f9-6181-4230-a702-2a44ce7c1e66",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "5421c8f9-6181-4230-a702-2a44ce7c1e66",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-a816ea5f-0fd0-495c-b432-9f571ab126f5",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "a816ea5f-0fd0-495c-b432-9f571ab126f5",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-faddacb6-4077-4f67-a1ef-8c28dea25595",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "faddacb6-4077-4f67-a1ef-8c28dea25595",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-10aa18b7-8439-4590-8add-dc0ee4f784a9",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "10aa18b7-8439-4590-8add-dc0ee4f784a9",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "b9ec921c-845f-4fdb-9952-b43ddff808bc-5421c8f9-6181-4230-a702-2a44ce7c1e66",
        source: "b9ec921c-845f-4fdb-9952-b43ddff808bc",
        target: "5421c8f9-6181-4230-a702-2a44ce7c1e66",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "b9ec921c-845f-4fdb-9952-b43ddff808bc-a816ea5f-0fd0-495c-b432-9f571ab126f5",
        source: "b9ec921c-845f-4fdb-9952-b43ddff808bc",
        target: "a816ea5f-0fd0-495c-b432-9f571ab126f5",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "b9ec921c-845f-4fdb-9952-b43ddff808bc-faddacb6-4077-4f67-a1ef-8c28dea25595",
        source: "b9ec921c-845f-4fdb-9952-b43ddff808bc",
        target: "faddacb6-4077-4f67-a1ef-8c28dea25595",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "b9ec921c-845f-4fdb-9952-b43ddff808bc-10aa18b7-8439-4590-8add-dc0ee4f784a9",
        source: "b9ec921c-845f-4fdb-9952-b43ddff808bc",
        target: "10aa18b7-8439-4590-8add-dc0ee4f784a9",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "b9ec921c-845f-4fdb-9952-b43ddff808bc-26d2420d-1715-4b98-a25c-f3710f3611aa",
        source: "b9ec921c-845f-4fdb-9952-b43ddff808bc",
        target: "26d2420d-1715-4b98-a25c-f3710f3611aa",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b-656fabf1-46bd-4592-ae04-576030fed217",
        source: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b",
        target: "656fabf1-46bd-4592-ae04-576030fed217",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "656fabf1-46bd-4592-ae04-576030fed217-15fd643e-16ee-4510-b002-71670f69cb9b",
        source: "656fabf1-46bd-4592-ae04-576030fed217",
        target: "15fd643e-16ee-4510-b002-71670f69cb9b",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "15fd643e-16ee-4510-b002-71670f69cb9b-5421c8f9-6181-4230-a702-2a44ce7c1e66",
        source: "15fd643e-16ee-4510-b002-71670f69cb9b",
        target: "5421c8f9-6181-4230-a702-2a44ce7c1e66",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "15fd643e-16ee-4510-b002-71670f69cb9b-a816ea5f-0fd0-495c-b432-9f571ab126f5",
        source: "15fd643e-16ee-4510-b002-71670f69cb9b",
        target: "a816ea5f-0fd0-495c-b432-9f571ab126f5",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "15fd643e-16ee-4510-b002-71670f69cb9b-faddacb6-4077-4f67-a1ef-8c28dea25595",
        source: "15fd643e-16ee-4510-b002-71670f69cb9b",
        target: "faddacb6-4077-4f67-a1ef-8c28dea25595",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "15fd643e-16ee-4510-b002-71670f69cb9b-10aa18b7-8439-4590-8add-dc0ee4f784a9",
        source: "15fd643e-16ee-4510-b002-71670f69cb9b",
        target: "10aa18b7-8439-4590-8add-dc0ee4f784a9",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "656fabf1-46bd-4592-ae04-576030fed217-5421c8f9-6181-4230-a702-2a44ce7c1e66",
        source: "656fabf1-46bd-4592-ae04-576030fed217",
        target: "5421c8f9-6181-4230-a702-2a44ce7c1e66",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "656fabf1-46bd-4592-ae04-576030fed217-a816ea5f-0fd0-495c-b432-9f571ab126f5",
        source: "656fabf1-46bd-4592-ae04-576030fed217",
        target: "a816ea5f-0fd0-495c-b432-9f571ab126f5",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "656fabf1-46bd-4592-ae04-576030fed217-faddacb6-4077-4f67-a1ef-8c28dea25595",
        source: "656fabf1-46bd-4592-ae04-576030fed217",
        target: "faddacb6-4077-4f67-a1ef-8c28dea25595",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "656fabf1-46bd-4592-ae04-576030fed217-10aa18b7-8439-4590-8add-dc0ee4f784a9",
        source: "656fabf1-46bd-4592-ae04-576030fed217",
        target: "10aa18b7-8439-4590-8add-dc0ee4f784a9",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "656fabf1-46bd-4592-ae04-576030fed217-26d2420d-1715-4b98-a25c-f3710f3611aa",
        source: "656fabf1-46bd-4592-ae04-576030fed217",
        target: "26d2420d-1715-4b98-a25c-f3710f3611aa",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "d82960fc-4109-4e1b-b28d-beb7a86d1c10-5421c8f9-6181-4230-a702-2a44ce7c1e66",
        source: "d82960fc-4109-4e1b-b28d-beb7a86d1c10",
        target: "5421c8f9-6181-4230-a702-2a44ce7c1e66",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "d82960fc-4109-4e1b-b28d-beb7a86d1c10-a816ea5f-0fd0-495c-b432-9f571ab126f5",
        source: "d82960fc-4109-4e1b-b28d-beb7a86d1c10",
        target: "a816ea5f-0fd0-495c-b432-9f571ab126f5",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "d82960fc-4109-4e1b-b28d-beb7a86d1c10-faddacb6-4077-4f67-a1ef-8c28dea25595",
        source: "d82960fc-4109-4e1b-b28d-beb7a86d1c10",
        target: "faddacb6-4077-4f67-a1ef-8c28dea25595",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "d82960fc-4109-4e1b-b28d-beb7a86d1c10-10aa18b7-8439-4590-8add-dc0ee4f784a9",
        source: "d82960fc-4109-4e1b-b28d-beb7a86d1c10",
        target: "10aa18b7-8439-4590-8add-dc0ee4f784a9",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "d82960fc-4109-4e1b-b28d-beb7a86d1c10-26d2420d-1715-4b98-a25c-f3710f3611aa",
        source: "d82960fc-4109-4e1b-b28d-beb7a86d1c10",
        target: "26d2420d-1715-4b98-a25c-f3710f3611aa",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b-10453db4-cbb3-4c22-bee2-793d10ed6d3b",
        source: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b",
        target: "10453db4-cbb3-4c22-bee2-793d10ed6d3b",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b-5e859660-508c-410d-be53-0e5047739895",
        source: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b",
        target: "5e859660-508c-410d-be53-0e5047739895",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b-a941bfc3-6bf6-4ce1-8b8f-0f5d4b5322b7",
        source: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b",
        target: "a941bfc3-6bf6-4ce1-8b8f-0f5d4b5322b7",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b-8f95c875-8544-4585-9046-db9585ca3402",
        source: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b",
        target: "8f95c875-8544-4585-9046-db9585ca3402",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "eb3efd8b-c4e8-4344-9cd3-24293be75d8e-b9d03733-2dfb-4196-8133-9be27d452602",
        source: "eb3efd8b-c4e8-4344-9cd3-24293be75d8e",
        target: "b9d03733-2dfb-4196-8133-9be27d452602",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "b9d03733-2dfb-4196-8133-9be27d452602-124db701-c837-41d5-bfde-b49421adbcdd",
        source: "b9d03733-2dfb-4196-8133-9be27d452602",
        target: "124db701-c837-41d5-bfde-b49421adbcdd",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "10453db4-cbb3-4c22-bee2-793d10ed6d3b-84667731-2c1e-4d4f-8f2b-b602682a6a60",
        source: "10453db4-cbb3-4c22-bee2-793d10ed6d3b",
        target: "84667731-2c1e-4d4f-8f2b-b602682a6a60",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-651c5357-6880-4129-9793-b6b308187df8",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "651c5357-6880-4129-9793-b6b308187df8",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-cc09e4f8-4274-486d-9073-1519018eaf57",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "cc09e4f8-4274-486d-9073-1519018eaf57",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-33671027-e55b-40a1-a449-eab60267e6c6",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "33671027-e55b-40a1-a449-eab60267e6c6",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-adbbda78-b18d-415c-aba5-49f3715021ba",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "adbbda78-b18d-415c-aba5-49f3715021ba",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-8ef84b2b-45ef-409c-b745-cb361458e515",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "8ef84b2b-45ef-409c-b745-cb361458e515",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-f7fa5629-9f52-4234-8835-83c069d648c2",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "f7fa5629-9f52-4234-8835-83c069d648c2",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-0fe14b90-abd7-4c6d-b4a5-89ed851f4b8e",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "0fe14b90-abd7-4c6d-b4a5-89ed851f4b8e",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "035f4920-9359-4e25-9ddd-0ff15a925fde-e7596d97-3301-4994-a677-b7dce2fd4fa2",
        source: "035f4920-9359-4e25-9ddd-0ff15a925fde",
        target: "e7596d97-3301-4994-a677-b7dce2fd4fa2",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "eb3efd8b-c4e8-4344-9cd3-24293be75d8e-aa1bc14b-a1a7-4c42-b36a-f97e3f489517",
        source: "eb3efd8b-c4e8-4344-9cd3-24293be75d8e",
        target: "aa1bc14b-a1a7-4c42-b36a-f97e3f489517",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "eb3efd8b-c4e8-4344-9cd3-24293be75d8e-7c6d9e97-ffab-4b7a-883e-90b4a7b6743e",
        source: "eb3efd8b-c4e8-4344-9cd3-24293be75d8e",
        target: "7c6d9e97-ffab-4b7a-883e-90b4a7b6743e",
      },
      {
        type: "line",
        style: "stroke-width: 2;",
        id: "a9ae9e7b-871d-4674-bc37-eb3e9f22eac0-f69c8d2c-ac1c-48d5-aef3-9cce795f100b",
        source: "a9ae9e7b-871d-4674-bc37-eb3e9f22eac0",
        target: "f69c8d2c-ac1c-48d5-aef3-9cce795f100b",
      },
    ],
  }),
} as const satisfies Record<string, SavedPage>;

export const projectTemplates = {
  empty: {
    activePageIndex: -1,
    pages: [],
  },
  default: {
    activePageIndex: 0,
    pages: [pageTemplates.default],
  },
} as const satisfies Record<string, Project>;
