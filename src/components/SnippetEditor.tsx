import Editor from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetStore";
import { useEffect, useState } from "react";
import {writeTextFile} from '@tauri-apps/api/fs'
import {desktopDir} from '@tauri-apps/api/path'

function SnippetEditor() {
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const [text, setText] = useState<string | undefined>("");

  useEffect(() => {
    if (!selectedSnippet) return;
    const savedSnippet = setTimeout(async () => {
      const desktopPath = await desktopDir();
      await writeTextFile(`${desktopPath}/taurifiles/${selectedSnippet.name}.txt`, text ?? "");
    }, 1000);

    return () => {
      clearTimeout(savedSnippet);
    }
  }, [text]);


  return (
    <>
      {selectedSnippet ? (
        <Editor
          theme="vs-dark"
          defaultLanguage="csharp"
          options={{
            fontsize: 20,
          }}
          onChange={(value) => {
            setText(value);
          }}
          value={selectedSnippet?.code ?? ""}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg text-gray-200">
            Select a snippet to get started
          </p>
        </div>
      )}
    </>
  );
}
export default SnippetEditor;
