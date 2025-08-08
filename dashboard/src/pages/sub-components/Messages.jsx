/**
 * MESSAGES PAGE COMPONENT
 * This page displays all contact messages received via the portfolio contact form.
 * Features: Fetching messages, error/success handling, message deletion, loading state.
 * UI: Responsive card layout with delete functionality and toast notifications.
 */

// Import required modules and components
import { Button } from "@/components/ui/button"; // UI button component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // UI card components
import { Tabs, TabsContent } from "@/components/ui/tabs"; // (Unused, can be removed if not needed)
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice"; // Redux actions for messages
import React, { useEffect, useState } from "react"; // React hooks
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { toast } from "react-toastify"; // Toast notifications
import SpecialLoadingButton from "./SpecialLoadingButton"; // Custom loading button

const Messages = () => {
  // Get messages state from Redux store (handles both plural and singular slice names)
  const messagesState = useSelector((state) => state.messages || state.message);
  const { messages, loading, error, message } = messagesState || {};
  // Track which message is being deleted for loading indicator
  const [messageId, setMessageId] = useState("");
  const dispatch = useDispatch();

  // ====================================
  // HANDLE MESSAGE DELETE
  // ====================================
  /**
   * Handles deletion of a message by ID
   * @param {string} id - Message document ID
   */
  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  // ====================================
  // FETCH MESSAGES ON MOUNT
  // ====================================
  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  // ====================================
  // HANDLE ERROR & SUCCESS TOASTS
  // ====================================
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message]);

  // ====================================
  // RENDER COMPONENT
  // ====================================
  return (
    <div className="min-h-[100vh] w-full flex flex-col items-center bg-muted/40 py-8 px-2">
      <div className="w-full max-w-5xl">
        <Card className="shadow-lg border border-gray-200">
          {/* Header section with title */}
          <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center bg-primary/10 rounded-t-lg">
            <CardTitle className="text-2xl font-bold tracking-tight text-primary">Messages</CardTitle>
          </CardHeader>
          {/* Main content: grid of messages or empty state */}
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {messages && messages.length > 0 ? (
              messages.map((element) => {
                return (
                  <Card key={element._id} className="flex flex-col gap-3 p-4 bg-white border border-gray-100 shadow-sm rounded-lg transition hover:shadow-md">
                    {/* Sender name */}
                    <CardDescription className="text-slate-900 text-base">
                      <span className="font-bold mr-2">Sender Name:</span>
                      {element.senderName}
                    </CardDescription>
                    {/* Subject */}
                    <CardDescription className="text-slate-900 text-base">
                      <span className="font-bold mr-2">Subject:</span>
                      {element.subject}
                    </CardDescription>
                    {/* Message body */}
                    <CardDescription className="text-slate-900 text-base">
                      <span className="font-bold mr-2">Message:</span>
                      {element.message}
                    </CardDescription>
                    {/* Delete button or loading indicator */}
                    <CardFooter className="justify-end mt-2">
                      {loading && (messageId === element._id) ? (
                        <SpecialLoadingButton
                          content={"Deleting"}
                          width={"w-32"}
                        />
                      ) : (
                        <Button
                          className="w-32 bg-destructive text-white hover:bg-destructive/90"
                          onClick={() => handleMessageDelete(element._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              // Empty state if no messages found
              <div className="w-full flex flex-col items-center justify-center py-16">
                <span className="text-2xl text-muted-foreground font-semibold">No Messages Found!</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
