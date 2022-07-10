// prisma/seed.ts
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
import prisma from '../lib/prisma'
import { Product } from '@prisma/client'

const productsData: Product[] = [ // we only have on user here
  {
    id: "ckxz6xh1i0049mcp0mbreausd",
    name: "Casper",
    description: "The default theme for Ghost. This is the latest development version of Casper! If you're just looking to download the latest release, head over to the releases page.",
    image: "https://user-images.githubusercontent.com/353959/66987533-40eae100-f0c1-11e9-822e-cbaf38fb8e3f.png",
    price: 20,
    slug: "casper",
    data: "https://github.com/TryGhost/Casper/archive/refs/tags/v4.7.2.zip",
  },
  {
    id: "ckxz6v90c0007mcp0ee10boq3",
    name: "Liebling",
    description: "# Liebling  Liebling is a beautiful and clean Ghost theme that is easy and comfortable to use. **It's free** and you can use it for any kind of content you might have. Now with dark mode 🌓!  If you find this theme useful, please consider to make a donation to support its development! ## Features  ### General features  * Clean and beautiful design * Lightning fast * Lightweight and high performance * Fully responsive, looks great on any device * Compatible with modern browsers  ### Ghost features  * Subscription form * Multiple authors * Logo support * Secondary menu * Accent color * Featured posts and pages * Post, Page, Tag, Authors, pages * Koenig editor * Bookmark card * Gallery card * Button card * NFT card * Callouts * Toggles * Quotes * Products * Audio * Video * File uploads * Headers * Blog title and description * Cover image for Home, Post, Page, Tag, Author pages * Author avatar, bio, location, website and social links * Facebook and Twitter social links * Reading time * Next and Previous post navigation * Primary tag in posts",
    image: "https://camo.githubusercontent.com/84ecb1a7e6e29b796a44c8e690e764688160948769dffde018eed7e76d08f22a/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f656465762f696d6167652f75706c6f61642f76313538333739323932382f6c6965626c696e672f6c6965626c696e672d70726f6d6f2d6465736b746f702e6a7067",
    price: 17,
    slug: "liebling",
    data: "https://github.com/eddiesigner/liebling/releases/download/v1.5.0/liebling.zip",
  },
  {
    id: "ckxz6v90c0007mcp0ee10boq3",
    name: "Pico",
    description: "A minimal, functional **theme for Ghost**. Best suitable for running a paid-membership publication on Ghost - originally created by @pjrvs and @jackellis, acquired and stewarded by @tryghost in 2020. *Now available for free, for everyone!*",
    image: "https://user-images.githubusercontent.com/120485/70646878-67b93400-1c7a-11ea-9722-64bb7ecf2d22.png",
    price: 70,
    slug: "pico",
    data: "https://github.com/TryGhost/Pico/archive/main.zip"
  },

]

const main = async () => {
  console.log('start seeding …') 
  for (const _product of productsData) {
    const user = await prisma.product.create({
      data: _product,
    });
    console.log(`Created Product with name: ${product.name}`);
  }
  console.log('seeding done');
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })