import { useSnippetStore } from "../store/snippetStore";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";

interface SnippetItemProps {
  snippetName: string;
}

function SnippetItem({ snippetName }: SnippetItemProps) {
  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet
  );
  const removeSnippetName = useSnippetStore((state) => state.removeSnippetName);
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);

  const handleDeleteSnippet = async (snippetName: string) => {
    const accept = await confirm(`Are you sure you want to delete ${snippetName}?`);
    if (!accept) return;

    const desktopPath = await desktopDir();
    const selectedFilePath = await join(desktopPath, "taurifiles", `${snippetName}.txt`);
    await removeFile(selectedFilePath);
    removeSnippetName(snippetName);

  }
  return (
    <div
      className={`py-2 px-4  hover:cursor-pointer flex justify-between ${
        selectedSnippet?.name == snippetName
          ? "bg-blue-500/30"
          : "hover:bg-neutral-900"
      }`}
      onClick={async () => {
        const desktopPath = await desktopDir();
        const selectedFilePath = await join(desktopPath, "taurifiles", `${snippetName}.txt`);
        console.log(selectedFilePath);
        const snippetText = await readTextFile(selectedFilePath);

        setSelectedSnippet({name: snippetName, code: snippetText});
      }}
    >
      <p>{snippetName}</p>
      <div className="flex gap-x-2">
        <button onClick={(e)=> {
          e.stopPropagation();
          handleDeleteSnippet(snippetName);
        }}>delete</button>

      </div>
    </div>
  );
}
export default SnippetItem;
