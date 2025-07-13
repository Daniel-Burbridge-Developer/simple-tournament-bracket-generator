import { useBracketStore } from '@/stores/bracketStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  Users,
  Crown,
  Gamepad2,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';

export const BracketList = () => {
  const {
    brackets,
    deleteBracket,
    resetBrackets,
    setWinner,
    regenerateBrackets,
  } = useBracketStore();

  if (brackets.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="space-y-2 text-center">
          <Gamepad2 className="mx-auto h-16 w-16 text-muted-foreground" />
          <h3 className="text-lg font-semibold">No Tournament Brackets</h3>
          <p className="text-muted-foreground">
            Generate brackets to start your tournament!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h2 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
            Tournament Brackets
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={regenerateBrackets}
            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
          <Button
            variant="outline"
            onClick={resetBrackets}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Reset All
          </Button>
        </div>
      </div>

      {/* Tournament Bracket Grid */}
      <div className="grid gap-6">
        {brackets.map((bracket, index) => (
          <div key={bracket.id} className="relative">
            {/* Bracket Connection Lines */}
            {index < brackets.length - 1 && (
              <div className="absolute left-1/2 top-full h-6 w-px -translate-x-1/2 transform bg-gradient-to-b from-purple-300 to-transparent" />
            )}

            <Card className="relative overflow-hidden border-2 border-purple-200 transition-all duration-200 hover:border-purple-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {bracket.name}
                    </span>
                  </div>
                  {bracket.winner && (
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Crown className="h-4 w-4" />
                      <span className="text-sm font-medium">Winner</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Participants */}
                <div className="grid grid-cols-2 gap-4">
                  {bracket.participants.map((participant, participantIndex) => (
                    <div
                      key={participant.id}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                        bracket.winner?.id === participant.id
                          ? 'border-yellow-400 bg-yellow-50 shadow-md'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                      onClick={() =>
                        !bracket.winner && setWinner(bracket.id, participant)
                      }
                    >
                      {/* Winner indicator */}
                      {bracket.winner?.id === participant.id && (
                        <div className="absolute -right-2 -top-2">
                          <Crown className="h-5 w-5 text-yellow-500" />
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-lg font-bold text-white">
                            {participant.name.charAt(0).toUpperCase()}
                          </div>
                          {participant.imageUrl && (
                            <img
                              src={participant.imageUrl}
                              alt={participant.name}
                              className="absolute inset-0 h-12 w-12 rounded-full object-cover"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate font-semibold text-gray-900">
                            {participant.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Player {participantIndex + 1}
                          </p>
                        </div>

                        {/* Click to select winner indicator */}
                        {!bracket.winner && (
                          <div className="flex items-center space-x-1 text-purple-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">
                              Click to win
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* VS Separator */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-3 text-sm font-bold text-purple-600">
                        VS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteBracket(bracket.id)}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Tournament Stats */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  Total Matches: {brackets.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-700">
                  Winners: {brackets.filter((b) => b.winner).length}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Tournament Progress</p>
              <p className="text-lg font-bold text-purple-600">
                {Math.round(
                  (brackets.filter((b) => b.winner).length / brackets.length) *
                    100,
                )}
                %
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
