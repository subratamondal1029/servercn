/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs-extra";
import path from "node:path";

export async function fetchIndex(registryUrl: string) {

    const res = await fetch(`${registryUrl}/index.json`)

    if (!res.ok) {
        throw new Error(`Failed to fetch registry: ${res.statusText}`)
    }

    const data = await res.json()
    // const { data } = await axios.get(`${registryUrl}/index.json`)
    return data
}

export async function fetchComponent(
    registryUrl: string,
    slug: string,
    category: string
) {

    const res = await fetch(`${registryUrl}/${category}/${slug}.json`)

    if (!res.ok) {
        throw new Error(`Failed to fetch registry: ${res.statusText}`)
    }

    const data = await res.json()

    return data
}

export async function writeFiles(files: any[]) {
    for (const file of files) {
        const targetPath = path.join(process.cwd(), file.path)

        await fs.ensureDir(path.dirname(targetPath))

        if (await fs.pathExists(targetPath)) {
            console.log(`⚠ Skipped (exists): ${file.path}`)
            continue
        }

        await fs.writeFile(targetPath, file.content, "utf8")

        console.log(`✔ Created ${file.path}`)
    }
}