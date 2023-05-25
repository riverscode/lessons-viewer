import { useEffect } from "react"
import {desktopDir} from '@tauri-apps/api/path'
import {readDir} from '@tauri-apps/api/fs'
import { useSnippetStore } from "../store/snippetStore"
import SnippetItem from "./SnippetItem"

function SnippetList() {
  const setSnippetNames = useSnippetStore(state => state.setSnippetNames)
  const snippetNames = useSnippetStore(state => state.snippetNames)
  useEffect(() => {
    async function getSnippets() {

      const desktopPath = await desktopDir()
      const result =await  readDir(`${desktopPath}/taurifiles`)
      const fileNames = result.map( file => file.name!.split(".")[0]);

      setSnippetNames(fileNames)
    }
    getSnippets()
  }, [])

  return (
    <div>
      {snippetNames.map(snippetName => (
        <div key={snippetName} >
          <SnippetItem snippetName={snippetName} />
        </div>
      ))}
    </div>
  )
}
export default SnippetList