import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Info, BookHeart } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { useCompletion } from "ai/react";

interface InterpretationResult {
  literalMeaning: string;
  underlyingThoughts: string;
  trueMeaning: string;
  confidenceLevel: string;
  confidenceExplanation: string;
}

interface Interpretation {
  process: string;
  result?: InterpretationResult;
}

interface ResultItemProps {
  emoji: string;
  title: string;
  content: string;
  delay: number;
}

function stringToInterpretation(text: string): Interpretation | undefined {
  if (!text) return undefined;

  // Extract process section between interpretation_process tags
  // Match opening tag and capture everything after it
  const processMatch = text.match(
    /<interpretation_process>([\s\S]*?)(?:<\/interpretation_process>|$)/
  );
  const process = processMatch ? processMatch[1].trim() : "";

  // Try to extract and parse JSON after the process section
  try {
    const jsonMatch = text.match(/```json\s*({[\s\S]*?})\s*```/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[1]);
      return {
        process,
        result: {
          literalMeaning: result.literal_meaning || "",
          underlyingThoughts: result.underlying_thoughts || "",
          trueMeaning: result.true_meaning || "",
          confidenceLevel: result.confidence_level || "",
          confidenceExplanation: result.confidence_explanation || "",
        },
      };
    }
  } catch (e) {
    // If JSON parsing fails or is incomplete, return empty result
    console.error("Failed to parse JSON:", e);
  }

  // Return with empty result if no valid JSON found
  return {
    process,
  };
}

function formatConfidenceLevel(level: string) {
  if (level === "low") return "⬇️ Thấp";
  if (level === "medium") return "➡️ Trung bình";
  if (level === "high") return "⬆️ Cao";
  return `❓ ${level}`;
}

const ResultItem = ({ emoji, title, content, delay }: ResultItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="mb-2 flex items-start space-x-2"
  >
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        <span className="mr-1 font-semibold">
          {emoji} {title}
        </span>
        {content}
      </p>
    </div>
  </motion.div>
);

export default function CommunicationInterpreter() {
  const [context, setContext] = useState<string>("");

  const {
    completion,
    error,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useCompletion({
    api: "/api/completion",
    body: {
      context,
    },
  });

  const interpretation = stringToInterpretation(completion);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mx-auto w-full max-w-6xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center justify-center gap-2 text-center text-2xl font-bold">
            <MessageCircle className="h-6 w-6 text-purple-500" />
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Thấu hiểu phụ nữ - Hạnh phúc thăng hoa với AI 🤗
            </motion.span>
          </CardTitle>
          <CardDescription className="text-center text-base text-gray-600">
            Đàn ông có thể không hiểu phụ nữ. Nhưng AI của chúng tôi thì có!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="context"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Hoàn cảnh dẫn đến câu nói đó?
              </label>
              <Textarea
                id="context"
                placeholder="Bối cảnh, thời gian, địa điểm, quan hệ 2 bên..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full bg-white dark:bg-gray-700"
                rows={2}
              />
            </div>
            <div>
              <label
                htmlFor="statement"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Cô ấy nói gì?
              </label>
              <Textarea
                id="statement"
                placeholder="Gõ vào đây..."
                value={input}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-gray-700"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 bg-purple-500 text-white hover:bg-purple-600"
                disabled={isLoading || input.length === 0}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Đang giải mã...
                  </>
                ) : (
                  <>
                    <BookHeart className="mr-2 h-4 w-4" /> Giải mã ngôn ngữ phụ
                    nữ!
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  setInput("");
                  setContext("");
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>

        {error && (
          <CardContent>
            <p className="text-red-500">{error.message}</p>
          </CardContent>
        )}

        <AnimatePresence>
          {interpretation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardFooter className="flex flex-col space-y-4">
                <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-2 rounded-lg bg-white p-4 shadow dark:bg-gray-700"
                  >
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                      <Info className="h-5 w-5 text-blue-500" />
                      Phân tích ngữ cảnh
                    </h3>
                    <ReactMarkdown className="prose prose-sm max-w-none">
                      {interpretation.process}
                    </ReactMarkdown>
                  </motion.div>

                  {interpretation.result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="rounded-lg bg-white p-4 shadow dark:bg-gray-700"
                    >
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                        <BookHeart className="h-5 w-5 text-green-500" />
                        Giải mã
                      </h3>
                      <ResultItem
                        emoji="📝"
                        title="Nghĩa đen:"
                        content={interpretation.result.literalMeaning}
                        delay={0.6}
                      />
                      <ResultItem
                        emoji="💭"
                        title="Suy nghĩ tiềm ẩn:"
                        content={interpretation.result.underlyingThoughts}
                        delay={0.7}
                      />
                      <ResultItem
                        emoji="💡"
                        title="Ý nghĩa thực sự:"
                        content={interpretation.result.trueMeaning}
                        delay={0.8}
                      />

                      <ResultItem
                        emoji="❓"
                        title="Giải thích thêm:"
                        content={interpretation.result.confidenceExplanation}
                        delay={0.9}
                      />
                      <ResultItem
                        emoji="📊"
                        title="Mức độ tin cậy:"
                        content={formatConfidenceLevel(
                          interpretation.result.confidenceLevel
                        )}
                        delay={1}
                      />
                    </motion.div>
                  )}
                </div>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
