// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create Users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      auth0Id: 'auth0|admin_seed',
      role: 'ADMIN',
    },
  })

  const tutorUser = await prisma.user.create({
    data: {
      email: 'tutor@example.com',
      name: 'Tutor User',
      auth0Id: 'auth0|tutor_seed',
      role: 'TUTOR',
    },
  })

  const studentUser = await prisma.user.create({
    data: {
      email: 'student@example.com',
      name: 'Student User',
      auth0Id: 'auth0|student_seed',
      role: 'STUDENT',
    },
  })

  console.log('Created users...')

  // Create Academic Data
  const professorSmith = await prisma.professor.create({
    data: {
      name: 'Dr. Smith',
      email: 'smith@university.com',
      createdById: adminUser.id,
    },
  })

  const semesterFall = await prisma.semester.create({
    data: {
      name: 'Fall',
      year: 2024,
      createdById: adminUser.id,
    },
  })

  const courseCalc = await prisma.course.create({
    data: {
      name: 'Calculus 101',
      code: 'MATH101',
      professorId: professorSmith.id,
      createdById: adminUser.id,
    },
  })

  console.log('Created academic data...')

  // Create Notes
  await prisma.note.create({
    data: {
      title: 'Chapter 1: Limits',
      description: 'A comprehensive summary of the first chapter.',
      filePath: 'seed/placeholder.pdf',
      fileType: 'pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploaderId: tutorUser.id,
      courseId: courseCalc.id,
      semesterId: semesterFall.id,
    },
  })

  await prisma.note.create({
    data: {
      title: 'Chapter 2: Derivatives',
      description: 'Practice problems and solutions for derivatives.',
      filePath: 'seed/placeholder2.pdf',
      fileType: 'pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploaderId: studentUser.id,
      courseId: courseCalc.id,
      semesterId: semesterFall.id,
    },
  })

  console.log('Created notes...')

  // Create an Active Raffle
  const now = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(now.getDate() + 1)

  await prisma.raffle.create({
    data: {
      title: 'Welcome Week Giveaway!',
      description: 'Upload a note to be entered to win!',
      startTime: now,
      endTime: tomorrow,
      raffle_prizes: {
        create: [
          { name: 'University Hoodie', quantity: 1 },
          { name: 'Free Coffee Coupon', quantity: 5 },
        ],
      },
    },
  })

  console.log('Created active raffle...')
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
