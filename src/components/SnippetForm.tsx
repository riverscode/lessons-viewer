import { useState } from "react";

import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/snippetStore";

function SnippetForm() {
  const [snippetName, setSnippetName] = useState("");
  const addSnippetName = useSnippetStore((state) => state.addSnippetName);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const desktopPath = await desktopDir();
        await writeTextFile(`${desktopPath}/taurifiles/${snippetName}.txt`, "");
        addSnippetName(snippetName);
        setSnippetName("");
      }}
    >
      <input
        type="text"
        placeholder="Write a snippet"
        className="bg-zinc-900 w-full border-none outline-none p-4"
        onChange={(e) => setSnippetName(e.target.value)}
        value={snippetName}
      />
    </form>
  );
}
export default SnippetForm;
