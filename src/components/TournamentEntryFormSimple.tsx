import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "@tanstack/react-form";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, LoaderCircle, X } from "lucide-react";
// import { validateUsername } from "@/api/user";
// import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
